import SearchBox from "@/components/SearchBox";
import { type country } from "@/types/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const res = await fetch("https://restcountries.com/v3.1/all");

  const countries = await res.json();
  const searchQuery = searchParams.query?.toLocaleLowerCase().trim() || "";

  const filteredCountries = countries.filter((country: country) => {
    return country.name.common.toLocaleLowerCase().includes(searchQuery);
  });
  return (
    <div>
      <SearchBox />
      <div>
        {filteredCountries.map((country: country, index: number) => {
          return <div key={index}>{country?.name?.common}</div>;
        })}
      </div>
    </div>
  );
}
