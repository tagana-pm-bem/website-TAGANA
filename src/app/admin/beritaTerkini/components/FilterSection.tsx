"use client";

import { Status, Kategori } from "../types";
import { KATEGORI_LIST, KATEGORI_CONFIG } from "../constants";

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | Status;
  onStatusChange: (status: "all" | Status) => void;
  kategoriFilter: "all" | Kategori;
  onKategoriChange: (kategori: "all" | Kategori) => void;
  resultCount: number;
  totalCount: number;
}

export default function FilterSection({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  kategoriFilter,
  onKategoriChange,
  resultCount,
  totalCount,
}: FilterSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari berita..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-700">Status:</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
          <button
            onClick={() => onStatusChange("all")}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => onStatusChange("published")}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              statusFilter === "published"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => onStatusChange("draft")}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              statusFilter === "draft"
                ? "bg-gray-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Kategori Filter dengan Grouping */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-700">Kategori:</p>

        {/* Kategori Bencana */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600 px-2">
            Berita Bencana
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
            {["banjir", "longsor", "kebakaran", "gempa"].map((kat) => {
              const kategori = kat as Kategori;
              return (
                <button
                  key={kategori}
                  onClick={() => onKategoriChange(kategori)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    kategoriFilter === kategori
                      ? KATEGORI_CONFIG[kategori].activeBadge
                      : KATEGORI_CONFIG[kategori].badge + " hover:opacity-80"
                  }`}
                >
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kategori Umum */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600 px-2">
            Berita Umum</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
            <button
              onClick={() => onKategoriChange("all")}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                kategoriFilter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua
            </button>
            {[
              "umum",
              "acara",
              "sosial",
              "kesehatan",
              "pendidikan",
              "ekonomi",
            ].map((kat) => {
              const kategori = kat as Kategori;
              return (
                <button
                  key={kategori}
                  onClick={() => onKategoriChange(kategori)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap capitalize ${
                    kategoriFilter === kategori
                      ? KATEGORI_CONFIG[kategori].activeBadge
                      : KATEGORI_CONFIG[kategori].badge + " hover:opacity-80"
                  }`}
                >
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Count */}
      <p className="text-xs sm:text-sm text-gray-600">
        Menampilkan {resultCount} dari {totalCount} berita
      </p>
    </div>
  );
}
