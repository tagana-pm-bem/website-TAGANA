"use client";

import React from "react";
import Image from "next/image";
// 1. Import helper style
import { getKategoriStyle } from "../constants";

interface NewsCardProps {
  berita: {
    id: string; // Sesuaikan dengan tipe ID Anda (string/number)
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
    status?: string; // Opsional: tambahkan status jika perlu
  };
  // 2. Hapus getCategoryColor dari props karena sudah tidak dibutuhkan
  formatDate: (date: string) => string;
  onReadMore: (id: string) => void;
}

export function NewsCard({
  berita,
  formatDate,
  onReadMore,
}: NewsCardProps) {
  
  // 3. Ambil style badge secara dinamis di sini
  const style = getKategoriStyle(berita.category);

  return (
    <article
      className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onReadMore(berita.id)}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {berita.image ? (
          <Image
            src={berita.image}
            alt={berita.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg
              className="w-16 h-16 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"
              />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            // 4. Gunakan style.badge dari helper
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm ${style.badge}`}
          >
            {berita.category}
          </span>
        </div>

        {/* Status Badge (Opsional, sesuaikan logika jika perlu) */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md ${
            berita.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {berita.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
          {berita.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed flex-1">
          {berita.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={berita.date}>{formatDate(berita.date)}</time>
          </div>

          {berita.location && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="line-clamp-1 max-w-[100px]">{berita.location}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}