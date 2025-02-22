import { country } from "@/types/types";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
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
    <>
      <h1>{countryData.name.common}</h1>
    </>
  );
}
