import { CountryCard } from "@/components/CountryCard";
import FilterSelect from "@/components/FilterSelect";
import SearchBox from "@/components/SearchBox";
import { type country } from "@/lib/types";

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
    <div className="p-10 flex flex-col gap-8">
      <div className="flex flex-col gap-12 items-center my-12">
        <h1 className="text-center font-bold text-5xl">Explore Countries</h1>
      </div>
      <div className="flex gap-2 py-5">
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="flex-[0.5]">
          <FilterSelect />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map((country: country, index: number) => (
          <CountryCard
            name={country?.name?.common}
            region={country.region}
            population={country.population}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
