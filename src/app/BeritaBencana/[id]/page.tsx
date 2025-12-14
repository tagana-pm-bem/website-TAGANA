"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { beritaService } from "@/services/beritaService";
import { DetailNewsCardPage } from "./components/DetailNewsCardPage"; 
import { Loader2 } from "lucide-react";

export default function DetailBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [berita, setBerita] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await beritaService.getById(id);
        
        if (!data) {
           setError(true);
        } else {
           setBerita(data);
        }
      } catch (err) {
        console.error("Gagal load detail berita:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-2">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 text-sm">Memuat berita...</p>
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari mungkin sudah dihapus atau URL salah.</p>
          <button
            onClick={() => router.push("/admin/berita")} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-blue-200 shadow-md"
          >
            Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  const beritaDetail = {
    id: berita.id,
    title: berita.judul,
    category: berita.kategori_berita?.nama || "Umum", 
    author: {
      name: berita.penulis || "Admin",
      avatar: undefined, 
    },
    date: new Date(berita.created_at || berita.tanggal).toLocaleDateString("id-ID", {
      weekday: 'long',
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: "2 menit baca", 
    imageUrl: berita.file_url,
    content: berita.isi_berita || "<p>Tidak ada konten.</p>",
    location: berita.lokasi,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <DetailNewsCardPage 
        berita={beritaDetail} 
        onBack={() => router.back()} 
      />
    </div>
  );
}