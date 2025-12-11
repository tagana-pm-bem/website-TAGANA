"use client";

import React from "react";
import { dusunData } from "@/data/datadususn";

interface Props {
  selectedDusunId: number | null;
  onDusunChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
  onOpenInfo: () => void;
}

export default function Controls({ selectedDusunId, onDusunChange, onReset, onOpenInfo }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="bg-[#044BB1] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <label htmlFor="dusun-select" className="text-white font-bold text-sm uppercase tracking-wide bg-white/10 px-3 py-1 rounded-full border border-white/20 self-start sm:self-auto whitespace-nowrap">
            Pilih Dusun:
          </label>
          <div className="relative flex-1 group">
            <select
              id="dusun-select"
              value={selectedDusunId ?? ""}
              onChange={onDusunChange}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-white/30 bg-gradient-to-r from-white/15 to-white/10 text-white font-semibold text-sm sm:text-base focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/20 transition-all duration-300 cursor-pointer appearance-none shadow-lg hover:from-white/20 hover:to-white/15 hover:border-white/40 hover:shadow-xl backdrop-blur-sm"
            >
              <option value="" className="bg-[#1a4a9c] text-white py-2">Semua Dusun</option>
              {dusunData.map((dusun) => (
                <option key={dusun.id} value={dusun.id} className="bg-[#1a4a9c] text-white py-2">
                  {dusun.name}
                </option>
              ))}
            </select>

            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:scale-110">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm group-hover:blur-0"></div>
          </div>
        </div>
        {selectedDusunId !== null && (
          <button
            onClick={onReset}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenInfo}
          className="bg-[#044BB1] hover:bg-[#033a8c] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Info Lengkap Desa
        </button>
      </div>
    </div>
  );
}
