import CountryInfo from "@/components/CountryInfo";
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
        <Image
          src={countryData.flags.svg}
          alt={`${countryData.name.common}'s flag`}
          width={0}
          height={0}
          className="h-60 w-fit rounded-lg"
        />
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {countryData.name.common}
          </h1>
          <div className="flex flex-col h-48 flex-wrap gap-4">
            {countryData.capital && (
              <CountryInfo label="Capital" value={countryData.capital} />
            )}
            {countryData.population && (
              <CountryInfo
                label="Population"
                value={countryData.population.toString()}
              />
            )}
            {countryData.region && (
              <CountryInfo label="Region" value={countryData.region} />
            )}
            {countryData.subregion && (
              <CountryInfo label="Subregion" value={countryData.subregion} />
            )}
            {countryData.languages && (
              <CountryInfo
                label="Languages"
                value={Object.values(countryData.languages).join(", ")}
              />
            )}
            {countryData.timezones && (
              <CountryInfo
                label="Timezones"
                value={countryData.timezones
                  .map((timezone: string) => timezone)
                  .join(", ")}
              />
            )}
            {countryData.tld && (
              <CountryInfo
                label="Country Code"
                value={countryData.tld.map((tld: string) => tld).join(", ")}
              />
            )}
          </div>
          <GoogleMapsButton url={countryData.maps.googleMaps} />
        </div>
      </div>
    </div>
  );
}
