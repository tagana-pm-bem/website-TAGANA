"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { beritaService, BeritaAcaraDB } from "@/services/beritaService";
import { DetailNewsCardPage } from "./components/DetailNewsCardPage";
import { Loader2 } from "lucide-react";


export default function DetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [berita, setBerita] = useState<ReturnType<typeof mapBerita> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mapBerita = (data: BeritaAcaraDB) => ({
    id: data.id,
    title: data.judul || "Tidak ada judul",
    category: data.kategori_berita?.nama || "Umum",
    author: {
      name: data.penulis || "Admin",
      avatar: undefined,
    },
    date: data.tanggal || data.created_at || "-",
    readTime: "1 menit baca", 
    imageUrl: data.file_url || null,
    content: data.isi_berita || "<p>Tidak ada konten</p>",
    location: data.lokasi || null,
  });

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        const data = await beritaService.getById(id);
        if (!data) setError(true);
        else setBerita(mapBerita(data));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error || !berita) {
    return <div>Berita tidak ditemukan</div>;
  }

  return (
    <DetailNewsCardPage
      berita={berita}
      onBack={() => router.back()}
    />
  );
}
