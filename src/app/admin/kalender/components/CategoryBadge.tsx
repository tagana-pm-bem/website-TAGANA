"use client";

import React from "react";

export function CategoryBadge({ category }: { category: string }) {
  const cls =
    category === "meeting"
      ? "bg-blue-100 text-blue-800"
      : category === "training"
      ? "bg-green-100 text-green-800"
      : category === "event"
      ? "bg-purple-100 text-purple-800"
      : "bg-gray-100 text-gray-800";

  const label =
    category === "meeting" ? "Pertemuan" : category === "training" ? "Pelatihan" : category === "event" ? "Event" : category;

  return <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${cls}`}>{label}</span>;
}
