"use client";

import React from "react";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-gray-600">Total Penduduk</p>
        <p className="text-2xl font-bold text-blue-600 mt-2">9,410</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm text-gray-600">Penduduk Aktif</p>
        <p className="text-2xl font-bold text-green-600 mt-2">9,280</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <p className="text-sm text-gray-600">Penduduk Nonaktif</p>
        <p className="text-2xl font-bold text-orange-600 mt-2">130</p>
      </div>
    </div>
  );
}
