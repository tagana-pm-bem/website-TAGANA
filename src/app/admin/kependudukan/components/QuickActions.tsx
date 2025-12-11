"use client";

import React from "react";

export function QuickActions({ onAdd }: { onAdd?: () => void }) {
  return (
    <div className="space-y-3">
      <button
        onClick={onAdd}
        className="w-full md:w-auto flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
      >
        <div className="bg-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Tambah Penduduk</span>
      </button>
    </div>
  );
}
