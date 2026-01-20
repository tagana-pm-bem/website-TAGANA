"use client";

import React from "react";
import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "../ui/NewsCardSkeleton"; // Impor skeleton yang sudah dibuat

interface NewsGridProps {
  beritaList: Array<{
    id: string; 
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
    status?: string; 
  }>;
  isLoading?: boolean; // Tambahkan prop isLoading untuk kontrol skeleton
  formatDate: (date: string) => string;
  onReadMore: (id: string) => void; 
}

export function NewsGrid({
  beritaList,
  isLoading,
  formatDate,
  onReadMore,
}: NewsGridProps) {
  
  // 1. TAMPILAN LOADING (SKELETON)
  // Menampilkan 6 kerangka berita saat data sedang disinkronkan dari database
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  // 2. TAMPILAN JIKA DATA KOSONG
  if (beritaList.length === 0) return null;

  // 3. TAMPILAN DATA ASLI
  // Berita akan tampil secara otomatis dari yang terbaru berkat query order di service
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700"
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