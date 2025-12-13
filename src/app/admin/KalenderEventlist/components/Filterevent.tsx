"use client";

import { useState } from "react";
import { Calendar, MapPin, Filter, X, Heart, Users, BookOpen, Trophy } from "lucide-react";

interface FilterEventProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  dateFrom: string;
  dateTo: string;
  location: string;
}

export default function Filterevent({ onFilterChange }: FilterEventProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "semua",
    dateFrom: "",
    dateTo: "",
    location: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "semua", label: "Semua Event", icon: Calendar },
    { id: "kesehatan", label: "Kesehatan", icon: Heart },
    { id: "sosial", label: "Sosial", icon: Users },
    { id: "pendidikan", label: "Pendidikan", icon: BookOpen },
    { id: "olahraga", label: "Olahraga", icon: Trophy },
  ];

  const locations = [
    "Semua Lokasi",
    "Balai Desa",
    "Lapangan Desa",
    "Masjid",
    "Puskesmas",
    "Sekolah",
  ];

  const handleCategoryChange = (categoryId: string) => {
    const newFilters = { ...filters, category: categoryId };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateChange = (field: "dateFrom" | "dateTo", value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleLocationChange = (location: string) => {
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: "semua",
      dateFrom: "",
      dateTo: "",
      location: "",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== "semua") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.location) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const hasActiveFilters =
    filters.category !== "semua" ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.location;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Filter className="text-white" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Filter Event</h2>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-white text-blue-600 text-xs font-bold rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                Cari event sesuai preferensi
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
          >
            {showFilters ? <X size={20} className="text-white" /> : <Filter size={20} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Filters Content */}
      <div className={`p-6 ${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="space-y-5">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Kategori
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                      filters.category === cat.id
                        ? "bg-blue-500 text-white shadow-md scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Icon size={18} className={filters.category === cat.id ? "text-white" : "text-blue-500"} />
                    <span className="text-xs text-center leading-tight">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Rentang Tanggal
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleDateChange("dateFrom", e.target.value)}
                  placeholder="Dari tanggal"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-300"
                />
              </div>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleDateChange("dateTo", e.target.value)}
                  placeholder="Sampai tanggal"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Lokasi
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filters.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer hover:border-gray-300 font-medium text-gray-700"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc === "Semua Lokasi" ? "" : loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <>
              <div className="border-t border-gray-200"></div>
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-all duration-200 border border-red-200 hover:border-red-300"
              >
                <X size={16} />
                <span className="text-sm">Reset Filter</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
