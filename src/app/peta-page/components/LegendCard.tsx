"use client";

import React from "react";

export default function LegendCard() {
  const legends = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      title: "Marker Lokasi Dusun",
      description: "Penanda lokasi di peta",
      accentColor: "border-blue-600 bg-blue-50",
    },

      {
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      title: "Titik pantau Banjir",
      description: "Lokasi pengamatan banjir",
      accentColor: "border-orange-600 bg-orange-50",
    },
   
    {
      icon: <div className="w-6 h-6 bg-red-500 rounded opacity-70"></div>,
      title: "Zona Banjir",
      description: "Area rawan banjir",
      accentColor: "border-red-500 bg-red-100",
    },
    {
      icon: <div className="w-8 h-0 border-t-4 border-dashed border-gray-50"></div>,
      title: "Batas Dusun",
      description: "Garis batas wilayah dusun",
      accentColor: "border-gray-700 bg-gray-400",
    },
    {
      icon: <div className="w-8 h-1 bg-gray-50"></div>,
      title: "Batas RT",
      description: "Garis batas Rukun Tetangga",
      accentColor: "border-gray-700 bg-gray-400",
    },
    {
      icon: <div className="w-8 h-1 bg-yellow-500"></div>,
      title: "Jalan",
      description: "Jalur jalan utama",
      accentColor: "border-yellow-500 bg-yellow-50",
    },

   
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-200">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span>Legenda Peta</span>
      </h1>

      {/* Legend Items */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {legends.map((legend, index) => (
          <div
            key={index}
            className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-l-4 ${legend.accentColor} shadow-md hover:shadow-lg transition-all duration-200`}
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
              {legend.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base text-gray-800 leading-tight">
                {legend.title}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {legend.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
