"use client";

import React from "react";
import Image from "next/image";

export function NewsCard({ berita, getCategoryColor, getStatusColor, formatDate, onReadMore }: any) {
  return (
    <div className="bg-white shadow-[-1px_4px_34px_5px_rgba(0,_0,_0,_0.35)] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onReadMore(berita.id)}>
      <div className="relative h-56 bg-gray-200">
        {berita.image ? (
          <Image
            src={berita.image}
            alt={berita.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="font-medium">{berita.category}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(berita.date)}</span>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {berita.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {berita.description}
        </p>
      </div>
    </div>
  );
}
