"use client";

import React from "react";
import { NewsCard } from "./NewsCard";

export function NewsGrid({ beritaList, getCategoryColor, getStatusColor, formatDate, onReadMore }: any) {
  return (
    beritaList.length === 0 ? null : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((b: any) => (
          <NewsCard key={b.id} berita={b} getCategoryColor={getCategoryColor} getStatusColor={getStatusColor} formatDate={formatDate} onReadMore={onReadMore} />
        ))}
      </div>
    )
  );
}
