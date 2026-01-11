"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewsGrid } from "./components/NewsGrid";
import { NoResults } from "./components/NoResults";
import FilterBerita from "./components/FIlterBerita";
import { beritaService } from "@/services/beritaService"; 
import { Loader2 } from "lucide-react";
// Import Store
import { useBeritaStore } from "../../hooks/useBeritaStore"; 

export default function BeritaBencanaPage() {
  const router = useRouter();
  
  // Ambil state dari Zustand Store
  const { allBerita, setAllBerita } = useBeritaStore();
  
  // isLoading tetap di local state karena ini berkaitan dengan session fetching saat ini
  const [isLoading, setIsLoading] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false); // Untuk menangani Next.js Hydration

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState<{
    kategori: string | null;
    waktu: string | null;
  }>({
    kategori: null,
    waktu: null,
  });

  // Handle Hydration (Memastikan data dari storage sudah terbaca di client)
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      // JIKA sudah ada data di store, jangan ambil data lagi dari API
      if (allBerita.length > 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await beritaService.getAll();
        const publishedData = data.filter((item: any) => item.status === 'published');
        setAllBerita(publishedData); // Simpan ke Store (Otomatis ke sessionStorage)
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (hasHydrated) {
      loadData();
    }
  }, [hasHydrated, allBerita.length, setAllBerita]);

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

      return matchSearch && matchKategori;
    });
  }, [searchQuery, filterState, allBerita]);

  const mappedBeritaForUI = filteredBerita.map((item) => ({
    id: item.id,
    title: item.judul,
    description: cleanHtml(item.isi_berita), 
    date: item.created_at || item.tanggal,
    category: item.kategori_berita?.nama || "Umum",
    image: item.file_url, 
    status: item.status,
    location: item.lokasi // Pastikan lokasi di-map jika ada di NewsCard
  }));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleReadMore = (id: string) => router.push(`/BeritaBencana/detail?id=${id}`);

  // Jangan render apapun sampai hydration selesai untuk menghindari mismatch error
  if (!hasHydrated) return null;

  return (
    <div className="w-full px-4 md:px-14 mx-auto py-8 mb-48">
      {/* Search & Filter Bar */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul, deskripsi, atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`inline-flex items-center gap-2 px-8 py-2 border rounded-lg cursor-pointer text-lg font-medium transition ${showFilter ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.447.832l-4 2.667A1 1 0 019 22v-9.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span>Filter</span>
        </button>
      </div>

      {showFilter && (
        <div className="mb-6">
          <FilterBerita onFilterChange={(f: any) => setFilterState({ kategori: f.kategori, waktu: f.waktu })} />
        </div>
      )}

      {isLoading && allBerita.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Menampilkan <span className="font-bold text-[#044BB1]">{mappedBeritaForUI.length}</span> berita
            </p>
          </div>

          {mappedBeritaForUI.length === 0 ? (
            <NoResults message={searchQuery ? "Tidak ditemukan berita." : "Belum ada berita."} />
          ) : (
            <NewsGrid
              beritaList={mappedBeritaForUI} 
              getStatusColor={() => "bg-green-500"}
              formatDate={formatDate}
              onReadMore={handleReadMore}
            />
          )}
        </>
      )}
    </div>
  );
}