"use client";

import { Kategori } from "../types";
import { KATEGORI_CONFIG, KATEGORI_BENCANA, KATEGORI_UMUM } from "../constants";

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  kategoriFilter: "all" | Kategori;
  onKategoriChange: (kategori: "all" | Kategori) => void;
  resultCount: number;
  totalCount: number;
}

export default function FilterSection({
  searchQuery,
  onSearchChange,
  kategoriFilter,
  onKategoriChange,
  resultCount,
  totalCount,
}: FilterSectionProps) {

  // Fungsi helper untuk merender tombol kategori agar lebih bersih
  const renderCategoryButton = (kategori: Kategori) => {
    const isActive = kategoriFilter === kategori;
    const config = KATEGORI_CONFIG[kategori];

    return (
      <button
        key={kategori}
        onClick={() => onKategoriChange(kategori)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
          isActive
            ? `${config.activeBadge} shadow-sm border-transparent scale-105`
            : `${config.badge} bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50`
        }`}
      >
        {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border  border-gray-100 p-5 mb-6">
      <div className="flex flex-col gap-5">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Filter Berita</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Menampilkan <span className="font-semibold text-blue-600">{resultCount}</span> dari {totalCount} berita
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari judul atau isi berita..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <svg
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Filter Categories */}
        <div className="space-y-5">
          
          {/* Group 1: Kategori Umum */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 bg-gray-400 rounded-full"></span>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Kategori Umum</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-image-fade">
              <button
                onClick={() => onKategoriChange("all")}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                  kategoriFilter === "all"
                    ? "bg-gray-800 text-white border-transparent shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                Semua
              </button>
              {KATEGORI_UMUM.map((kat) => renderCategoryButton(kat as Kategori))}
            </div>
          </div>

          {/* Group 2: Kategori Bencana */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 bg-red-500 rounded-full"></span>
              <p className="text-xs font-bold text-red-500 uppercase tracking-wide">Kategori Bencana</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {KATEGORI_BENCANA.map((kat) => renderCategoryButton(kat as Kategori))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}