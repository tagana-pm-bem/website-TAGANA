"use client";

import React from "react";

export default function LegendCard() {
  return (
    <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
      <h1 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📍</span>
        <span>Legenda Zona</span>
      </h1>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div>
            <p className="font-semibold text-sm text-red-700">Zona Bahaya Tinggi</p>
            <p className="text-xs text-red-600">Risiko longsor & banjir tinggi</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div>
            <p className="font-semibold text-sm text-yellow-700">Zona Waspada</p>
            <p className="text-xs text-yellow-600">Potensi bahaya sedang</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <div>
            <p className="font-semibold text-sm text-green-700">Zona Aman</p>
            <p className="text-xs text-green-600">Aman dari bencana</p>
          </div>
        </div>
      </div>
    </div>
  );
}
