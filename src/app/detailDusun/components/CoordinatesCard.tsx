"use client";

import React from "react";

interface Props {
  latitude: number;
  longitude: number;
}

export default function CoordinatesCard({ latitude, longitude }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xl">
      <h3 className="font-bold text-gray-800 mb-5 flex items-center text-base sm:text-lg">
        <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
        </div>
        Koordinat Lokasi
      </h3>
      <div className="space-y-2">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-1 border border-blue-200 shadow-sm">
          <p className="text-xs text-gray-600 mb-1 ml-1.5 font-semibold uppercase tracking-wide">
            Latitude
          </p>
          <p className="font-mono ml-1.5 font-bold text-[#044BB1] text-lg break-all">
            {latitude.toFixed(7)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-1 border border-blue-200 shadow-sm">
          <p className="text-xs text-gray-600 mb-1 ml-1.5 font-semibold uppercase tracking-wide">
            Longitude
          </p>
          <p className="font-mono ml-1.5 font-bold text-[#044BB1] text-lg break-all">
            {longitude.toFixed(7)}
          </p>
        </div>
      </div>
    </div>
  );
}
