"use client";

import React from "react";

export function Header({ title = "Berita Bencana", subtitle = "Informasi terkini tentang bencana di Indonesia", onBack }: { title?: string; subtitle?: string; onBack?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-blue-100">{subtitle}</p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
