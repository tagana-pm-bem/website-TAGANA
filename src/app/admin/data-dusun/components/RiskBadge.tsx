"use client";

import React from "react";

export function RiskBadge({ level }: { level: "high" | "medium" | "low" }) {
  const cls =
    level === "high"
      ? "bg-red-100 text-red-800"
      : level === "medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  const label = level === "high" ? "Tinggi" : level === "medium" ? "Sedang" : "Rendah";

  return (
    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
  );
}
