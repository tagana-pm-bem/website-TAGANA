"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewsGrid } from "./components/NewsGrid";
import { NoResults } from "./components/NoResults";
import FilterBerita from "./components/FIlterBerita";
import { beritaService } from "@/services/beritaService"; 
import { Loader2 } from "lucide-react";

export default function BeritaBencanaPage() {
  const router = useRouter();
  
  const [allBerita, setAllBerita] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState<{
    kategori: string | null;
    waktu: string | null;
  }>({
    kategori: null,
    waktu: null,
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await beritaService.getAll();
        const publishedData = data.filter((item: any) => item.status === 'published');
        setAllBerita(publishedData);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const cleanHtml = (htmlContent: string | null) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/<[^>]+>/g, '');
  };

  const filteredBerita = useMemo(() => {
    return allBerita.filter((berita) => {
      const cleanDeskripsi = cleanHtml(berita.isi_berita).toLowerCase();
      const matchSearch =
        berita.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cleanDeskripsi.includes(searchQuery.toLowerCase());

      const kategoriName = berita.kategori_berita?.nama?.toLowerCase() || "";
      const matchKategori =
        !filterState.kategori ||
        kategoriName.includes(filterState.kategori.toLowerCase());

      const matchWaktu = true; 

      return matchSearch && matchKategori && matchWaktu;
    });
  }, [searchQuery, filterState, allBerita]);

  const mappedBeritaForUI = filteredBerita.map((item) => ({
    id: item.id,
    title: item.judul,
    description: cleanHtml(item.isi_berita), 
    date: item.created_at || item.tanggal,
    category: item.kategori_berita?.nama || "Umum",
    image: item.file_url, 
    status: item.status
  }));

  const getCategoryColor = (category: string) => {
    const colors: any = {
      Banjir: "bg-blue-100 text-blue-700 border-blue-300",
      Longsor: "bg-amber-100 text-amber-700 border-amber-300",
      Gempa: "bg-red-100 text-red-700 border-red-300",
      Kebakaran: "bg-orange-100 text-orange-700 border-orange-300",
      Lainnya: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[category] || colors.Lainnya;
  };

  const getStatusColor = (status: string) => {
    return "bg-green-500"; 
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFilterChange = (filters: any) => {
    setFilterState({
      kategori: filters.kategori || null,
      waktu: filters.waktu || null,
    });
  };

  const handleReadMore = (id: number) => router.push(`/BeritaBencana/${id}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-48">
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul, deskripsi, atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            aria-label="Cari berita"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none"
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

        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`inline-flex items-center gap-2 px-8 py-2 border rounded-lg cursor-pointer text-lg font-medium transition ${showFilter ? 'bg-blue-700 text-white border-blue-700' : 'bg-blue-600 text-white border-gray-300 hover:bg-blue-700'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
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

      {showFilter && (
        <div className="mb-6">
          <FilterBerita onFilterChange={handleFilterChange} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Menampilkan{" "}
              <span className="font-bold text-[#044BB1]">
                {mappedBeritaForUI.length}
              </span>{" "}
              berita
            </p>
          </div>

          {mappedBeritaForUI.length === 0 ? (
            <NoResults message={searchQuery ? "Tidak ditemukan berita dengan kata kunci tersebut." : "Belum ada berita yang diterbitkan."} />
          ) : (
            <NewsGrid
              beritaList={mappedBeritaForUI} 
              getCategoryColor={getCategoryColor}
              getStatusColor={getStatusColor}
              formatDate={formatDate}
              onReadMore={handleReadMore}
            />
          )}
        </>
      )}
    </div>
  );
}