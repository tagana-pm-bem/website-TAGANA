"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/event/select";

interface EventsFilterProps {
  locations: string[];
  categories: string[];
  onFilterChange: (filters: { location: string; category: string }) => void;
}

export default function EventsFilter({
  locations,
  categories,
  onFilterChange,
}: EventsFilterProps) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleLocation = (value: string) => {
    setLocation(value);
    onFilterChange({ location: value, category });
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    onFilterChange({ location, category: value });
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Filter Lokasi */}
      <Select onValueChange={handleLocation}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih Lokasi" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filter Kategori */}
      <Select onValueChange={handleCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih Kategori" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
