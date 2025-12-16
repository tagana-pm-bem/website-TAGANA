"use client";

import React from "react";

interface RTData {
  rt: number;
  nama?: string;
  lp?: "L" | "P";
}

interface Props {
  dusunName: string;
  rtData: RTData[] | undefined;
}

export default function RTListCard({ dusunName, rtData }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
      <h3 className="font-bold text-gray-800 mb-4 sm:mb-6 flex items-center text-base sm:text-lg lg:text-xl">
      <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
        <svg
        className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
        </svg>
      </div>
      <span className="flex-1">
        Daftar Rukun Tetangga (RT)
        <span className="block text-xs sm:text-sm font-normal text-gray-500 mt-0.5 sm:mt-1">
        Informasi RT di {dusunName}
        </span>
      </span>
      </h3>

      {rtData && rtData.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {rtData.map((rt: RTData, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-md sm:rounded-lg p-1.5 sm:p-2 group-hover:scale-110 transition-transform duration-300">
            <svg
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
            </svg>
          </div>
          <span className="bg-blue-100 text-[#044BB1] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            RT {rt.rt}
          </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">
            Ketua RT
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-bold text-gray-800 truncate">
            {rt.nama || "Belum ada data"}
            </p>
          </div>

          {rt.lp && (
            <div className="pt-1.5 sm:pt-2 border-t border-blue-100">
            <p className="text-[10px] sm:text-xs text-gray-500">Jenis Kelamin</p>
            <p className="text-xs sm:text-sm font-semibold text-[#044BB1]">
              {rt.lp === "L" ? "Laki-laki" : "Perempuan"}
            </p>
            </div>
          )}
          </div>
        </div>
        ))}
      </div>
      ) : (
      <div className="text-center py-6 sm:py-8">
        <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        </div>
        <p className="text-sm sm:text-base text-gray-500 font-medium">Data RT belum tersedia</p>
      </div>
      )}
    </div>
  );
}
