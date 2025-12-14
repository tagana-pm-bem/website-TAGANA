"use client";

import React from "react";
import Image from "next/image";

interface NewsCardProps {
  berita: {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
  };
  getCategoryColor: (category: string) => string;
  formatDate: (date: string) => string;
  onReadMore: (id: number) => void;
}

export function NewsCard({
  berita,
  getCategoryColor,
  formatDate,
  onReadMore,
}: NewsCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onReadMore(berita.id)}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-32 md:w-40 h-40 sm:h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          {berita.image ? (
            <Image
              src={berita.image}
              alt={berita.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 128px, 160px"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
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
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
              {berita.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {berita.description}
            </p>
          </div>

          {/* Footer: Date and Category */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <time className="text-gray-500" dateTime={berita.date}>
              {formatDate(berita.date)}
            </time>
            <span className="text-gray-400" aria-hidden="true">
              •
            </span>
            <span
              className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${getCategoryColor(
                berita.category
              )}`}
              aria-label={`Kategori: ${berita.category}`}
            >
              {berita.category}
            </span>
          </div>
        </div>

        {/* Status Badge (Optional) */}
        <div className="hidden sm:flex items-start">
          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md">
            published
          </span>
        </div>
      </div>
    </article>
  );
}
