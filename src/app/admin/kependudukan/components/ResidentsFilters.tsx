"use client";

import React from "react";

export function ResidentsFilters() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center space-x-2 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Cari nama atau NIK..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <select className="px-3 py-2 border border-gray-200 rounded-lg">
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">Filter</button>
      </div>
    </div>
  );
}
