"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterSelect() {
  const searchParams = useSearchParams();
  const r = searchParams.get("region");
  const router = useRouter();
  const [region, setRegion] = useState(r || "null");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (region && region != "null") {
      params.set("region", region);
    } else {
      params.delete("region");
    }

    router.replace(`?${params.toString()}`);
  }, [region, router]);

  return (
    <Select value={region} onValueChange={(value) => setRegion(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="null">All Regions</SelectItem>
        <SelectItem value="africa">Africa</SelectItem>
        <SelectItem value="americas">Americas</SelectItem>
        <SelectItem value="asia">Asia</SelectItem>
        <SelectItem value="europe">Europe</SelectItem>
        <SelectItem value="oceania">Oceania</SelectItem>
      </SelectContent>
    </Select>
  );
}
