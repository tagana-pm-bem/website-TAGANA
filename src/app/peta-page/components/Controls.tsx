'use client';

import React, { useEffect, useState } from "react";
import { dusunService } from "@/services/dusunService";

interface Props {
  selectedDusunId: number | null;
  onDusunChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
  onOpenInfo: () => void;
}

export default function Controls({ selectedDusunId, onDusunChange, onReset, onOpenInfo }: Props) {
  const [dusunList, setDusunList] = useState<{ id: number; nama: string }[]>([]);

  useEffect(() => {
    const fetchDusun = async () => {
      try {
        const data = await dusunService.getAllNames();
        setDusunList(data || []);
      } catch (error) {
        console.error("Gagal load dusun:", error);
      }
    };
    fetchDusun();
  }, []);

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
              className="w-full px-4 sm:px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 appearance-none font-medium transition-all cursor-pointer hover:bg-white/20"
            >
              <option value="" className="text-gray-900 bg-white">Semua Dusun</option>
              {dusunList.map((dusun) => (
                <option key={dusun.id} value={dusun.id} className="text-gray-900 bg-white">
                  {dusun.nama}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/70 group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tombol Reset & Info tetap sama */}
        <div className="flex gap-2">
          {selectedDusunId !== null && (
            <button
              onClick={onReset}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          )}
          
          <button
            onClick={onOpenInfo}
            className="bg-white text-[#044BB1] hover:bg-blue-50 px-4 py-2 rounded-lg text-sm sm:text-base font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">Info Desa</span>
            <span className="sm:hidden">Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}