import GoogleMapsButton from "@/components/GoogleMapsButton";
import { country } from "@/lib/types";
import Image from "next/image";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name", {
    next: { revalidate: 86400 },
  });
  const countries = await res.json();

  return countries.map((country: country) => ({
    countryname: country.name.common.toLowerCase(),
  }));
};

export default async function CountryPage({
  params,
}: {
  params: Promise<{ countryname: string }>;
}) {
  const { countryname } = await params;

  const res = await fetch(`https://restcountries.com/v3.1/name/${countryname}`);
  const countryData = (await res.json())[0];

  return (
    <div className="container p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-24 justify-center my-32">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">
            {countryData.name.common}
          </h1>
          <p className="text-lg">
            Capital:{" "}
            <span className="text-gray-600">{countryData.capital}</span>
          </p>
          <p className="text-lg">
            Population:{" "}
            <span className="text-gray-600">
              {countryData.population.toLocaleString()}
            </span>
          </p>
          <p className="text-lg">
            Region: <span className="text-gray-600">{countryData.region}</span>
          </p>
          <p className="text-lg">
            Subregion:{" "}
            <span className="text-gray-600">{countryData.subregion}</span>
          </p>
          <GoogleMapsButton url={countryData.maps.googleMaps} />
        </div>
        <Image
          src={countryData.flags.svg}
          alt={`${countryData.name.common}'s flag`}
          width={0}
          height={0}
          className="h-60 w-fit rounded-lg"
        />
      </div>
    </div>
  );
}
