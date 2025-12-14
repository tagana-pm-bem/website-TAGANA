"use client";

import React from "react";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  beritaList: Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
  }>;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: string) => string;
  formatDate: (date: string) => string;
  onReadMore: (id: number) => void;
}

export function NewsGrid({
  beritaList,
  getCategoryColor,
  getStatusColor,
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
          getCategoryColor={getCategoryColor}
          formatDate={formatDate}
          onReadMore={onReadMore}
        />
      ))}
    </section>
  );
}
