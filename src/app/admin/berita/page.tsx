"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Send, TrendingUp, Loader2 } from "lucide-react";
import Card from "@/components/ui/card";
import RichTextEditor from "./components/RichTextEditor";
import BeritaTerkini from "./components/beritaTerkini";
import { KategoriBeritaService } from "@/services/kategoriBeritaService";
import { useBerita } from "./hooks/useBerita.hooks"; 

interface KategoriItem {
  id: number;
  kategoriBerita: string; 
}

export default function KelolaBeritaPage() {
  const { createBerita, isLoading } = useBerita();
  const [refreshKey, setRefreshKey] = useState(0);
  const [openKategori, setOpenKategori] = useState(false);
  const [judul, setJudul] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<{id: number, nama: string} | null>(null);
  const [isiBerita, setIsiBerita] = useState(""); 
  const [kategori, setKategori] = useState<KategoriItem[]>([]);
  const [loadingKategori, setLoadingKategori] = useState(true);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const data = await KategoriBeritaService.getAllNames();
        setKategori(data as KategoriItem[]);
      } catch (error) {
        console.error("Gagal load kategori:", error);
      } finally {
        setLoadingKategori(false);
      }
    };
    fetchKategori();
  }, []);

  const handlePublish = async () => {
    if (!judul || !selectedKategori) {
      alert("Harap lengkapi judul dan kategori!");
      return;
    }
    if (!isiBerita || isiBerita === "<p></p>") {
      alert("Isi berita tidak boleh kosong!");
      return;
    }

    const payload = {
      judul: judul,
      kategori_berita_id: selectedKategori.id,
      isi_berita: isiBerita, 
      status: "published" as "published",
      penulis: "Admin",
      tanggal: new Date().toISOString(),
      file_url: null,
      lokasi: "Kantor Desa" 
    };

    try {
      await createBerita(payload);
      setRefreshKey((prev) => prev + 1); 
      setJudul("");
      setIsiBerita(""); 
      setSelectedKategori(null);

    } catch (error) {
      console.error("Gagal submit di page:", error);
    }
  };

  return (
    <div className="flex flex-row w-full gap-6 mb-[100px]">
      <Card className="w-full flex flex-col gap-8 max-w-200">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-md font-semibold">Tulis Berita Baru</h1>
          <p className="text-sm cursor-pointer hover:underline text-gray-500">Simpan Draft</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="font-semibold text-sm">Judul Berita</label>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukan judul berita..."
            disabled={isLoading}
            className="w-full rounded-xl shadow-sm border border-gray-300 py-2 px-3 placeholder:text-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label className="font-semibold text-sm">Kategori</label>
          <div className="relative w-full">
            <div
              onClick={() => !isLoading && setOpenKategori(!openKategori)}
              className={`w-full flex items-center justify-between rounded-xl shadow-sm border border-gray-300 px-3 py-2 cursor-pointer bg-white hover:bg-gray-50 transition-colors ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2 text-sm">
                <span className={!selectedKategori ? "text-gray-400" : "text-black"}>
                  {selectedKategori ? selectedKategori.nama : "Pilih Kategori"}
                </span>
              </div>
              <ChevronDown size={18} className={`transition-transform duration-200 ${openKategori ? "rotate-180" : ""}`} />
            </div>

            {openKategori && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-sm rounded-xl p-2 z-20 border border-gray-100 max-h-60 overflow-y-auto">
                {loadingKategori ? (
                  <p className="text-xs text-center p-2 text-gray-400">Memuat...</p>
                ) : (
                  kategori.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setSelectedKategori({ id: opt.id, nama: opt.kategoriBerita });
                        setOpenKategori(false);
                      }}
                      className="px-4 py-3 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {opt.kategoriBerita}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm">Isi Berita</h1>
        </div>
        <RichTextEditor 
          content={isiBerita}
          onChange={(html) => setIsiBerita(html)}
        />

        <div className="flex flex-row gap-3 items-center justify-end w-full pt-4">
          <button 
            disabled={isLoading}
            className="min-w-20 bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 cursor-pointer duration-300 rounded-xl py-2 px-4 text-sm font-medium disabled:opacity-50"
          >
            Batal
          </button>
          
          <button 
            onClick={handlePublish}
            disabled={isLoading}
            className="flex flex-row items-center gap-2 min-w-20 bg-[#044BB1] shadow-sm hover:bg-blue-700 hover:shadow-blue-200/50 cursor-pointer duration-300 rounded-xl py-2 px-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
               <Loader2 size={16} className="animate-spin text-white" />
            ) : (
               <Send size={16} color="white" />
            )}
            <span className="text-white font-semibold text-sm">
              {isLoading ? "Menerbitkan..." : "Publikasikan Berita"}
            </span>
          </button>
        </div>
      </Card>

      <div className="flex flex-col gap-6 w-1/2 h-full">
        <div className="w-full rounded-2xl flex p-6 justify-between items-center bg-gradient-to-br from-[#044BB1] to-[#0566d6] shadow-sm text-white">
          <div className="flex flex-col gap-1 items-start">
            <h1 className="font-bold text-5xl">24</h1>
            <p className="text-sm font-medium text-blue-100">Berita diterbitkan bulan ini</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <TrendingUp size={28} className="text-white" />
          </div>
        </div>
        
        <Card className="h-full w-full">
          <BeritaTerkini refreshTrigger={refreshKey} />
        </Card>
      </div>
    </div>
  );
}