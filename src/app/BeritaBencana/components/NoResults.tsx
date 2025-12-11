"use client";

import React from "react";

export function NoResults({ message = "Tidak Ada Berita Ditemukan. Coba ubah filter atau kata kunci pencarian Anda." }: { message?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Berita Ditemukan</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
