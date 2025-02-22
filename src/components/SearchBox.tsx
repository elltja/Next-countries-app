"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const q = searchParams.get("query");
  const router = useRouter();
  const [query, setQuery] = useState(q || "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.replace(`?${params.toString()}`);
  }, [query, router]);

  return (
    <div>
      <Input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search country"
        className="text-black w-64"
      />
    </div>
  );
}
