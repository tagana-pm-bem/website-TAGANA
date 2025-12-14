"use client";

import React from "react";
import { Info } from "lucide-react";

export default function LegendCard() {
  const legends = [
    {
      color: "bg-red-500",
      label: "Risiko Tinggi",
      description: "Potensi bencana sangat berbahaya, memerlukan kewaspadaan maksimal",
    },
    {
      color: "bg-yellow-500",
      label: "Risiko Sedang",
      description: "Potensi bencana dengan tingkat bahaya sedang, perlu persiapan",
    },
    {
      color: "bg-blue-500",
      label: "Risiko Rendah",
      description: "Potensi bencana kecil, tetap waspada dan siaga",
    },
    {
      color: "bg-emerald-500",
      label: "Aman",
      description: "Tidak ada potensi bencana signifikan",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_17px_4px_rgba(50,_50,_93,_0.25)] border border-gray-100">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-bold text-gray-700 uppercase">
          Keterangan Tingkat Risiko
        </h3>
      </div>

      {/* Legend Items */}
      <div className="space-y-3">
        {legends.map((legend, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {/* Color Indicator */}
            <div className={`w-4 h-4 ${legend.color} rounded-full flex-shrink-0 mt-0.5`} />
            
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">{legend.label}</p>
              <p className="text-xs text-gray-600 mt-1">{legend.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">
          * Tingkat risiko dapat berubah sewaktu-waktu. Selalu ikuti arahan dari petugas berwenang.
        </p>
      </div>
    </div>
  );
}