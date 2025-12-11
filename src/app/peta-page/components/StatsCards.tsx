"use client";

import React from "react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">⚠️</span>
          <span className="text-3xl font-bold text-red-600">3</span>
        </div>
        <h3 className="font-semibold text-gray-800">Zona Bahaya Tinggi</h3>
        <p className="text-sm text-gray-600">Area Rawan Bencana</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">⚡</span>
          <span className="text-3xl font-bold text-yellow-600">8</span>
        </div>
        <h3 className="font-semibold text-gray-800">Zona Waspada</h3>
        <p className="text-sm text-gray-600">Perlu Perhatian</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">✅</span>
          <span className="text-3xl font-bold text-green-600">2</span>
        </div>
        <h3 className="font-semibold text-gray-800">Zona Aman</h3>
        <p className="text-sm text-gray-600">Bebas Risiko</p>
      </div>
    </div>
  );
}
