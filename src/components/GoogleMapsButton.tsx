import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function GoogleMapsButton({ url }: { url: string }) {
  return (
    <Button variant="outline" className="w-fit h-10 p-5">
      <Link href={url} className="flex gap-2 font-semibold items-center">
        <Image
          src="/google-maps.png"
          alt="google-maps icon"
          width={25}
          height={25}
        />
        Open on Google Maps
      </Link>
    </Button>
  );
}
