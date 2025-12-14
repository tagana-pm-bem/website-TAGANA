"use client";

import { useState, useMemo } from "react";
import { beritaBencanaData } from "@/data/beritaBencana";
import { useRouter } from "next/navigation";
import { NewsGrid } from "./components/NewsGrid";
import { NoResults } from "./components/NoResults";
import  Filterberita from "./components/FIlterBerita";

export default function BeritaBencanaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState<{
    disaster: string | null;
    categories: string[];
  }>({
    disaster: null,
    categories: [],
  });

  // Filter berita
  const filteredBerita = useMemo(() => {
    return beritaBencanaData.filter((berita) => {
      const matchSearch =
        berita.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        berita.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        berita.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDisaster =
        !filterState.disaster ||
        berita.category
          .toLowerCase()
          .includes(filterState.disaster.toLowerCase());

      const matchCategories =
        filterState.categories.length === 0 ||
        filterState.categories.some((cat) =>
          berita.category.toLowerCase().includes(cat.toLowerCase())
        );

      return matchSearch && matchDisaster && matchCategories;
    });
  }, [searchQuery, filterState]);

  const getCategoryColor = (category: string) => {
    const colors: any = {
      Banjir: "bg-blue-100 text-blue-700 border-blue-300",
      Longsor: "bg-amber-100 text-amber-700 border-amber-300",
      Gempa: "bg-red-100 text-red-700 border-red-300",
      "Angin Puting Beliung": "bg-purple-100 text-purple-700 border-purple-300",
      Kebakaran: "bg-orange-100 text-orange-700 border-orange-300",
      Lainnya: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[category] || colors.Lainnya;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      Terjadi: "bg-red-500",
      Ditangani: "bg-yellow-500",
      Selesai: "bg-green-500",
    };
    return colors[status] || colors.Terjadi;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFilterChange = (filters: any) => {
    // Map filters dari komponen FilterBerita ke filterState
    setFilterState({
      disaster: filters.kategori || null,
      categories: filters.subKategori ? [filters.subKategori] : [],
    });
  };

  const handleReadMore = (id: string) => router.push(`/BeritaBencana/${id}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-48">
      {/* Search Bar and Filter Button */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
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

        {/* Filter Button  */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="inline-flex items-center gap-2
         px-12 py-2
         bg-blue-600
         border border-gray-300
         rounded-lg
         cursor-pointer
         text-lg  font-medium text-white   
         transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.447.832l-4 2.667A1 1 0 019 22v-9.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="mb-6">
          <Filterberita onFilterChange={handleFilterChange} />
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan{" "}
          <span className="font-bold text-[#044BB1]">
            {filteredBerita.length}
          </span>{" "}
          berita
        </p>
      </div>

      {/* News Grid or No Results */}
      {filteredBerita.length === 0 ? (
        <NoResults />
      ) : (
        <NewsGrid
          beritaList={filteredBerita}
          getCategoryColor={getCategoryColor}
          getStatusColor={getStatusColor}
          formatDate={formatDate}
          onReadMore={handleReadMore}
        />
      )}
    </div>
  );
}
