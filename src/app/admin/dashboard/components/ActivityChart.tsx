"use client";

import React from "react";

export function ActivityChart() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Berita</h3>
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-400">Chart Area - Grafik publikasi berita per bulan</p>
      </div>
    </div>
  );
}
