import { CountryCard } from "@/components/countryCard";
import CountryFilterSelect from "@/components/CountryFilterSelect";
import SearchBox from "@/components/SearchBox";
import { type country } from "@/types/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string; region: string }>;
}) {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,population",
    { next: { revalidate: 86400 } }
  );

  const countries = await res.json();
  const searchQuery = (await searchParams).query?.toLowerCase().trim() || "";
  const regionFilter = (await searchParams).region?.toLowerCase().trim() || "";

  const filteredCountries = countries.filter((country: country) => {
    return (
      country.name.common.toLowerCase().includes(searchQuery) &&
      (regionFilter === "" || country.region.toLowerCase() === regionFilter)
    );
  });
  return (
    <div className="p-10">
      <div className="flex gap-2 py-5">
        <SearchBox />
        <CountryFilterSelect />
      </div>
      <div className="flex gap-4 flex-wrap">
        {filteredCountries.map((country: country, index: number) => {
          return (
            <CountryCard
              name={country?.name?.common}
              region={country.region}
              population={country.population}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
