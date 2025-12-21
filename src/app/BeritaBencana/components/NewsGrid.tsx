"use client";

import React from "react";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  beritaList: Array<{
    id: string; // Updated to string
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
    status?: string; // Optional: added for consistency
  }>;
  // Hapus getCategoryColor karena NewsCard sudah mandiri
  getStatusColor: (status: string) => string;
  formatDate: (date: string) => string;
  onReadMore: (id: string) => void; // Updated to string
}

export function NewsGrid({
  beritaList,
  // getStatusColor, // Bisa dihapus jika tidak dipakai di level ini
  formatDate,
  onReadMore,
}: NewsGridProps) {
  return beritaList.length === 0 ? null : (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Daftar Berita Bencana"
    >
      {beritaList.map((b) => (
        <NewsCard
          key={b.id}
          berita={b}
          formatDate={formatDate}
          onReadMore={onReadMore}
        />
      ))}
    </section>
  );
}