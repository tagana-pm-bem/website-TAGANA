"use client";

import { useEffect, useState } from "react";
import { 
  ChevronDown, 
  Send, 
  TrendingUp, 
  Loader2, 
  FileText, 
  LayoutGrid, 
  Clock,
  Save
} from "lucide-react";

// SHADCN & UI COMPONENTS
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import RichTextEditor from "./components/RichTextEditor";
import BeritaTerkini from "./components/beritaTerkini";
import ImageUpload from "./components/imageUpload";

// SERVICES & HOOKS
import { KategoriBeritaService } from "@/services/kategoriBeritaService";
import { beritaService } from "@/services/beritaService";
import { useBerita } from "./hooks/useBerita.hooks";
import { uploadImageByType } from "@/services/fileService"; 
import { getPublicImageUrl } from "@/lib/storage"; 

import { 
  confirmSaveChanges, 
  showLoading, 
  showDraggableSuccess, 
  showDraggableError 
} from "@/app/admin/ui/SweetAllert2";

interface KategoriItem {
  id: number;
  kategoriBerita: string;
}

export default function KelolaBeritaPage() {
  const { createBerita, isLoading } = useBerita();
  const [refreshKey, setRefreshKey] = useState(0);
  const [openKategori, setOpenKategori] = useState(false);
  const [judul, setJudul] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  const [isiBerita, setIsiBerita] = useState("");
  const [kategori, setKategori] = useState<KategoriItem[]>([]);
  const [loadingKategori, setLoadingKategori] = useState(true);
  
  const [jumlahBeritaBulanIni, setJumlahBeritaBulanIni] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // State untuk Gambar
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchBeritaStats = async () => {
      try {
        setLoadingStats(true);
        const allBerita = await beritaService.getAll();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const beritaBulanIni = allBerita.filter((berita) => {
          const beritaDate = new Date(berita.tanggal);
          return (
            beritaDate.getMonth() === currentMonth &&
            beritaDate.getFullYear() === currentYear
          );
        });
        
        setJumlahBeritaBulanIni(beritaBulanIni.length);
      } catch (error) {
        console.error("Gagal load stats berita:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchBeritaStats();
  }, [refreshKey]);

  const handlePublish = async () => {
    if (!judul || !selectedKategori) {
      showDraggableError("Data Belum Lengkap", "Harap lengkapi judul dan kategori!");
      return;
    }
    if (!isiBerita || isiBerita === "<p></p>") {
      showDraggableError("Konten Kosong", "Isi berita tidak boleh kosong!");
      return;
    }

    const result = await confirmSaveChanges("Publikasikan Berita?", "Ya, Terbitkan", "Batal");

    if (result.isConfirmed) {
      try {
        showLoading("Menerbitkan...", "Sedang mengupload dan menyimpan data...");
        let uploadedImageUrl = null;

        if (imageFile) {
          try {
            const filePath = await uploadImageByType(imageFile, "berita");
            uploadedImageUrl = getPublicImageUrl(filePath);
          } catch (uploadError) {
            console.error("Gagal upload gambar:", uploadError);
            showDraggableError("Gagal Upload Gambar", "Terjadi kesalahan saat mengupload gambar.");
            return;
          }
        }

        const payload = {
          judul: judul,
          kategori_berita_id: selectedKategori.id,
          isi_berita: isiBerita,
          status: "published" as "published",
          penulis: "Admin",
          tanggal: new Date().toISOString(),
          file_url: uploadedImageUrl,
        };

        await createBerita(payload);
        showDraggableSuccess("Berita Berhasil Diterbitkan!");

        setRefreshKey((prev) => prev + 1);
        setJudul("");
        setIsiBerita("");
        setSelectedKategori(null);
        setImageFile(null);
        setImagePreview(null);

      } catch (error) {
        console.error("Gagal submit di page:", error);
        showDraggableError("Gagal Menerbitkan", "Terjadi kesalahan pada sistem.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* KOLOM KIRI: FORM INPUT (8 Col) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-[#044BB1]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-medium">Tulis Berita Baru</CardTitle>
                    <CardDescription>Buat dan publikasikan berita terkini desa</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 gap-2">
                  <Save size={16} /> Simpan Draft
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 flex flex-col gap-6">
              {/* Input Judul */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Judul Berita</label>
                <input
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukkan judul berita yang menarik..."
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-200 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-50"
                />
              </div>

              {/* Input Kategori */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Kategori</label>
                <div className="relative">
                  <div
                    onClick={() => !isLoading && setOpenKategori(!openKategori)}
                    className={`w-full flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 cursor-pointer bg-white hover:border-blue-400 transition-all ${
                      isLoading ? "bg-gray-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <LayoutGrid size={16} className="text-slate-400" />
                      <span className={!selectedKategori ? "text-slate-400" : "text-slate-900 font-medium"}>
                        {selectedKategori ? selectedKategori.nama : "Pilih Kategori Berita"}
                      </span>
                    </div>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${openKategori ? "rotate-180" : ""}`} />
                  </div>

                  {openKategori && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl p-2 z-50 border border-slate-100 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                      {loadingKategori ? (
                        <div className="flex items-center justify-center p-4 gap-2 text-slate-400 text-xs">
                          <Loader2 size={14} className="animate-spin" /> Memuat...
                        </div>
                      ) : (
                        kategori.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => {
                              setSelectedKategori({ id: opt.id, nama: opt.kategoriBerita });
                              setOpenKategori(false);
                            }}
                            className="px-4 py-2.5 rounded-lg text-sm hover:bg-blue-50 hover:text-[#044BB1] cursor-pointer transition-colors"
                          >
                            {opt.kategoriBerita}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Editor */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Isi Konten</label>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                   <RichTextEditor content={isiBerita} onChange={(html) => setIsiBerita(html)} />
                </div>
              </div>

              {/* Upload Gambar */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Gambar Sampul</label>
                <ImageUpload
                  file={imageFile}
                  preview={imagePreview}
                  onChange={(file, preview) => {
                    setImageFile(file);
                    setImagePreview(preview);
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4">
                <Button 
                  variant="outline" 
                  disabled={isLoading} 
                  className="rounded-xl px-6 py-5 font-bold"
                >
                  Batal
                </Button>
                <Button 
                  onClick={handlePublish}
                  disabled={isLoading}
                  className="bg-[#044BB1] hover:bg-blue-700 rounded-xl px-8 py-5 font-bold gap-2 shadow-lg shadow-blue-200"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin text-white" />
                  ) : (
                    <Send size={18} />
                  )}
                  {isLoading ? "Menerbitkan..." : "Publikasikan Berita"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: STATS & TERKINI (4 Col) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Stat Card */}
          <div className="w-full rounded-[2rem] p-8 flex justify-between items-center bg-[#044BB1] shadow-xl shadow-blue-100 text-white relative overflow-hidden">
            <div className="flex flex-col gap-1 z-10">
              <h1 className="font-bold text-6xl tracking-tighter">
                {loadingStats ? <Loader2 size={40} className="animate-spin opacity-50" /> : jumlahBeritaBulanIni}
              </h1>
              <p className="text-sm font-medium text-blue-100 opacity-80 uppercase tracking-widest">
                Berita Terbit Bulan Ini
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md z-10">
              <TrendingUp size={32} />
            </div>
            {/* Dekorasi lingkaran di background */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full" />
          </div>

          {/* List Card */}
          <Card className="border-none shadow-sm flex flex-col h-full">
            <CardHeader className="border-b border-slate-100 py-4 px-6 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-slate-400" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Histori Berita
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <BeritaTerkini refreshTrigger={refreshKey} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}