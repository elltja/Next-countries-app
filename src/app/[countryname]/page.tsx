import GoogleMapsButton from "@/components/GoogleMapsButton";
import { country } from "@/types/types";
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
    <div className="flex p-16 w-3/4 gap-56">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl my-4">{countryData.name.common}</h1>
        <p>Capital: {countryData.capital}</p>
        <p>Population: {countryData.population}</p>
        <p>Region: {countryData.region}</p>
        <p>Subregion: {countryData.subregion}</p>
        <br />
        <GoogleMapsButton url={countryData.maps.googleMaps} />
      </div>

      <Image
        src={countryData.flags.svg}
        alt={`${countryData.name.common}'s flag`}
        width={0}
        height={0}
        className="w-80 h-auto"
      />
    </div>
  );
}
