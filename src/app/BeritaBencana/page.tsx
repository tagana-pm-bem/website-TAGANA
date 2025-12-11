"use client";

import { useState, useMemo } from "react";
import { beritaBencanaData } from "@/data/beritaBencana";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";
import { FilterPanel } from "./components/FilterPanel";
import { NewsGrid } from "./components/NewsGrid";
import { NoResults } from "./components/NoResults";

export default function BeritaBencanaPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const categories = [
    "Semua",
    "Banjir",
    "Longsor",
    "Gempa",
    "Angin Puting Beliung",
    "Kebakaran",
    "Lainnya",
  ];
  const statuses = ["Semua", "Terjadi", "Ditangani", "Selesai"];

  // Filter berita
  const filteredBerita = useMemo(() => {
    return beritaBencanaData.filter((berita) => {
      const matchCategory =
        selectedCategory === "Semua" || berita.category === selectedCategory;
      const matchStatus =
        selectedStatus === "Semua" || berita.status === selectedStatus;
      const matchSearch =
        berita.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        berita.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        berita.location.toLowerCase().includes(searchQuery.toLowerCase());

      let matchDate = true;
      if (dateFilter.start && dateFilter.end) {
        const beritaDate = new Date(berita.date);
        const startDate = new Date(dateFilter.start);
        const endDate = new Date(dateFilter.end);
        matchDate = beritaDate >= startDate && beritaDate <= endDate;
      }

      return matchCategory && matchStatus && matchSearch && matchDate;
    });
  }, [selectedCategory, selectedStatus, searchQuery, dateFilter]);

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const resetFilters = () => {
    setSelectedCategory("Semua");
    setSelectedStatus("Semua");
    setSearchQuery("");
    setDateFilter({ start: "", end: "" });
  };

  const handleReadMore = (id: string) => router.push(`/BeritaBencana/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-200 ">
      <Header onBack={() => router.push("/home")} />

      <div className="container mx-auto px-4 py-8">
        <FilterPanel
          show={showFilter}
          toggleShow={() => setShowFilter((s) => !s)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          statuses={statuses}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          resetFilters={resetFilters}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan{" "}
            <span className="font-bold text-[#044BB1]">
              {filteredBerita.length}
            </span>{" "}
            berita
          </p>
        </div>

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
    </div>
  );
}
<label className="block text-sm font-medium text-gray-700 mb-2">
  Cari Berita
</label>;
