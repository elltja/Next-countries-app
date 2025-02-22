import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function CountryCard({
  name,
  region,
  population,
}: {
  name: string;
  region: string;
  population: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="hover:cursor-pointer hover:underline">
          <Link href={name.toLowerCase()}>{name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Region: {region}</p>
        <p className="text-sm text-gray-500">Population: {population}</p>
      </CardContent>
    </Card>
  );
}
