"use client";

import { use } from "react";
import { beritaBencanaData } from "@/data/beritaBencana";
import { DetailNewsCardPage } from "./components/DetailNewsCardPage";
import { LikePage } from "../[id]/components/Likepage";
import { useRouter } from "next/navigation";

export default function DetailBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: paramId } = use(params);
  const id = parseInt(paramId);
  const berita = beritaBencanaData.find((b) => b.id === id);

  if (!berita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600">ID berita yang kamu cari tidak ada.</p>
          <button
            onClick={() => router.push("/BeritaBencana")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  // Transform data to match DetailNewsCardPage interface
  const beritaDetail = {
    id: berita.id.toString(),
    title: berita.title,
    category: berita.category,
    author: {
      name: berita.author,
      avatar: undefined,
    },
    date: new Date(berita.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: "4 menit baca",
    imageUrl: berita.image,
    content: berita.content.split("\n\n").filter((p) => p.trim() !== ""),
    location: berita.location,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DetailNewsCardPage 
        berita={beritaDetail} 
        onBack={() => router.push("/BeritaBencana")} 
      />
      
      {/* Like and Share Section */}
      {/* <div className="max-w-4xl mx-auto px-4">
        <LikePage
          initialLikes={1200}
          initialComments={24}
          onLike={() => console.log("Liked")}
          onComment={() => console.log("Comment")}
          onShare={() => console.log("Share")}
        />
      </div> */}
    </div>
  );
}
