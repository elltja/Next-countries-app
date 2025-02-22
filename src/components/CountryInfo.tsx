import React from "react";

export default function CountryInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p className="text-lg">
      {label}: <span className="text-gray-600">{value}</span>
    </p>
  );
}
