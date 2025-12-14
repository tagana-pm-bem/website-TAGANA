"use client";

import React from "react";

export default function LegendCard() {
  return (
    <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
        <span>Legenda Peta</span>
      </h1>
      <div className="space-y-3 grid grid-cols-3 grid-rows-2 gap-4  ">
        <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="text-red-500">
            <p className="font-semibold text-sm ">Zona Banjir</p>
            <p className="text-xs ">Area rawan banjir</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-500 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-white"></div>
          <div className="text-white">
            <p className="font-semibold text-sm ">Batas Dusun</p>
            <p className="text-xs ">Garis batas wilayah dusun</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-500 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-white"></div>
          <div>
            <p className="font-semibold text-sm text-white">Batas RT</p>
            <p className="text-xs text-white">Garis batas Rukun Tetangga</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg shadow-[0px_1px_21px_0px_rgba(0,_0,_0,_0.2)]">
          <div className="w-4 h-1 bg-yellow-600"></div>
          <div className="text-yellow-500">
            <p className="font-semibold text-sm ">Jalan</p>
            <p className="text-xs ">Jalur jalan utama</p>
          </div>
        </div>
      </div>
    </div>
  );
}
