"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NewsGrid } from "./components/NewsGrid";
import { NoResults } from "./components/NoResults";
import FilterBerita from "./components/FIlterBerita";
import { beritaService } from "@/services/beritaService"; 
import { Loader2, Search, Filter as FilterIcon } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Diperlukan untuk logika Realtime
import { useBeritaStore } from "../../hooks/useBeritaStore"; 

export default function BeritaBencanaPage() {
  const router = useRouter();
  
  // Ambil state dari Zustand Store
  const { allBerita, setAllBerita } = useBeritaStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState<{
    kategori: string | null;
    waktu: string | null;
  }>({
    kategori: null,
    waktu: null,
  });

  // Fungsi sinkronisasi data terbaru
  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const data = await beritaService.getAll();
      // Hanya menampilkan yang sudah diterbitkan
      const publishedData = data.filter((item: any) => item.status === 'published');
      setAllBerita(publishedData); 
    } catch (error) {
      console.error("Gagal sinkronisasi warta:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setAllBerita]);

  // Handle Hydration
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Logika Realtime & Refresh Otomatis
  useEffect(() => {
    if (!hasHydrated) return;

    // Ambil data awal (silent jika sudah ada cache di store)
    loadData(allBerita.length > 0);

    // Subscribe ke perubahan tabel berita_acara secara realtime
    const channel = supabase
      .channel('realtime-berita')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'berita_acara' },
        () => {
          // Jika ada update/insert dari admin, langsung tarik data terbaru tanpa reload
          loadData(true); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hasHydrated, loadData, allBerita.length]);

  const cleanHtml = (htmlContent: string | null) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/<[^>]+>/g, '');
  };

  // Filter Logic
  const filteredBerita = useMemo(() => {
    return allBerita.filter((berita) => {
      const cleanDeskripsi = cleanHtml(berita.isi_berita).toLowerCase();
      const matchSearch =
        berita.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cleanDeskripsi.includes(searchQuery.toLowerCase()) ||
        (berita.lokasi?.toLowerCase() || "").includes(searchQuery.toLowerCase());

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
    date: item.created_at || item.tanggal, // Otomatis terurut dari backend
    category: item.kategori_berita?.nama || "Umum",
    image: item.file_url, 
    status: item.status,
    location: item.lokasi 
  }));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  const handleReadMore = (id: string) => router.push(`/BeritaBencana/detail?id=${id}`);

  if (!hasHydrated) return null;

  return (
    <div className="w-full px-4 md:px-14 mx-auto py-8 mb-48 animate-in fade-in duration-500">
      {/* Search & Filter Bar */}
      <div className="mb-8 flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#044BB1] transition-colors" />
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul, isi, atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 pl-12 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-medium shadow-sm"
          />
        </div>

        <motion.button
          onClick={() => setShowFilter(!showFilter)}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl cursor-pointer text-sm font-medium transition-all shadow-md ${
            showFilter ? 'bg-[#044BB1] text-white shadow-blue-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FilterIcon size={18} className={showFilter ? "animate-pulse" : ""} />
          <span>Filter</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div 
            className="mb-8 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FilterBerita onFilterChange={(f: any) => setFilterState({ kategori: f.kategori, waktu: f.waktu })} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Loading & Stats */}
      <div className="mb-8 flex justify-between items-center px-2">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
          {isLoading ? (
            <span className="flex items-center gap-2 text-[#044BB1]">
              <Loader2 className="w-4 h-4 animate-spin" /> Sinkronisasi Warta Terbaru...
            </span>
          ) : (
            <>Terdapat <span className="text-[#044BB1] font-bold">{mappedBeritaForUI.length}</span> Berita Terpublikasi</>
          )}
        </p>
      </div>

      {/* Main Grid */}
      {mappedBeritaForUI.length === 0 && !isLoading ? (
        <NoResults message={searchQuery ? "Tidak ditemukan berita dengan kriteria tersebut." : "Belum ada berita yang diterbitkan."} />
      ) : (
        <NewsGrid
          beritaList={mappedBeritaForUI} 
          formatDate={formatDate}
          onReadMore={handleReadMore}
        />
      )}
    </div>
  );
}