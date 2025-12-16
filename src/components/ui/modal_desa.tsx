"use client";

import { useEffect } from "react";
import { useDemographics } from "@/hooks/useDemographics";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: ModalProps) {
  const stats = useDemographics();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const luasWilayah = 502.36;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Animasi untuk bar chart */
        @keyframes growBar {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes growHeight {
          from { height: 0; }
          to { height: 100%; }
        }
        .animate-bar-width {
          animation: growBar 0.8s ease-out forwards;
        }
        .animate-bar-height {
          animation: growHeight 0.8s ease-out forwards;
          transform-origin: bottom;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Informasi Desa Sriharjo</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {stats.isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-60 bg-gray-200 rounded-xl"></div>
            </div>
          ) : (
            <>
              {/* Tentang Daerah */}
              <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-[#044BB1]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-[#044BB1] rounded-lg p-3">
                    {/* Icon Location */}
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#044BB1]">Tentang Desa</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="leading-relaxed">
                    <span className="font-semibold">Sriharjo</span> adalah sebuah desa yang terletak di Kecamatan Imogiri...
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-500">Luas Wilayah</p>
                      <p className="text-lg font-bold text-[#044BB1]">{luasWilayah} Ha</p>
                    </div>
                    {/* Data jumlah dusun bisa diambil dari count array nanti jika perlu, atau hardcode */}
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-500">Jumlah Dusun</p>
                      <p className="text-lg font-bold text-[#044BB1]">13</p> 
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-500">Ketinggian</p>
                      <p className="text-lg font-bold text-[#044BB1]">58 mdpl</p>
                    </div>
                  </div>
                </div>
              </section>

            

              {/* --- DEMOGRAFI DARI SUPABASE --- */}
              <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-500 rounded-lg p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">
                    Demografi Penduduk
                  </h3>
                </div>

                {/* 1. Total Penduduk, KK, Kepadatan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <p className="text-sm text-gray-500 mb-2">Total Penduduk</p>
                    <p className="text-3xl font-bold text-[#044BB1]"> {stats.totalPenduduk.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-gray-400 mt-1">Jiwa</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <p className="text-sm text-gray-500 mb-2">Jumlah KK</p>
                    <p className="text-3xl font-bold text-green-600"> {stats.totalKK.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-gray-400 mt-1">Kepala Keluarga</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <p className="text-sm text-gray-500 mb-2">Kepadatan</p>
                    <p className="text-3xl font-bold text-orange-500"> {stats.kepadatan}</p>
                    <p className="text-xs text-gray-400 mt-1">Jiwa/Ha</p>
                  </div>
                </div>

                {/* 2. CHART GENDER - Horizontal Bar */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded"></div>
                    Komposisi Gender
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Laki-laki */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Laki-laki</span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {stats.lakiLaki.toLocaleString('id-ID')} ({((stats.lakiLaki / stats.totalPenduduk) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                          style={{ width: `${(stats.lakiLaki / stats.totalPenduduk) * 100}%` }}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Perempuan */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-pink-500 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Perempuan</span>
                        </div>
                        <span className="text-sm font-bold text-pink-600">
                          {stats.perempuan.toLocaleString('id-ID')} ({((stats.perempuan / stats.totalPenduduk) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-pink-500 to-pink-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                          style={{ width: `${(stats.perempuan / stats.totalPenduduk) * 100}%` }}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CHART KELOMPOK RENTAN - Column Chart */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-orange-500 rounded"></div>
                    Kelompok Rentan
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {/* Balita */}
                    <div className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
                          style={{ height: `${Math.min((stats.balita / stats.totalPenduduk) * 100 * 3, 100)}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center z-10">
                            <p className="text-2xl font-bold text-gray-700">{stats.balita}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 font-medium">Balita (0-5)</p>
                    </div>

                    {/* Lansia */}
                    <div className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-1000 ease-out"
                          style={{ height: `${Math.min((stats.lansia / stats.totalPenduduk) * 100 * 3, 100)}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center z-10">
                            <p className="text-2xl font-bold text-gray-700">{stats.lansia}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 font-medium">Lansia (&gt;60)</p>
                    </div>

                    {/* Ibu Hamil */}
                    <div className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-pink-500 to-pink-400 transition-all duration-1000 ease-out"
                          style={{ height: `${Math.min((stats.ibuHamil / stats.totalPenduduk) * 100 * 3, 100)}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center z-10">
                            <p className="text-2xl font-bold text-gray-700">{stats.ibuHamil}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 font-medium">Ibu Hamil</p>
                    </div>

                    {/* Disabilitas */}
                    <div className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 transition-all duration-1000 ease-out"
                          style={{ height: `${Math.min((stats.disabilitas / stats.totalPenduduk) * 100 * 3, 100)}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center z-10">
                            <p className="text-2xl font-bold text-gray-700">{stats.disabilitas}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 font-medium">Disabilitas</p>
                    </div>
                  </div>

                  {/* Penduduk Miskin - Highlight */}
                  
                </div>

                {/* 4. PIE CHART KOMPOSISI USIA */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-green-500 rounded"></div>
                    Komposisi Usia
                  </h4>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Donut Chart */}
                    <div className="relative w-48 h-48">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle cx="96" cy="96" r="80" fill="transparent" stroke="#e5e7eb" strokeWidth="32"/>
                        
                        {/* Balita segment */}
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="80" 
                          fill="transparent" 
                          stroke="#3b82f6" 
                          strokeWidth="32"
                          strokeDasharray={`${(stats.persenBalita / 100) * 502} 502`}
                          className="transition-all duration-1000 ease-out"
                        />
                        
                        {/* Dewasa segment */}
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="80" 
                          fill="transparent" 
                          stroke="#22c55e" 
                          strokeWidth="32"
                          strokeDasharray={`${(stats.persenDewasa / 100) * 502} 502`}
                          strokeDashoffset={`-${(stats.persenBalita / 100) * 502}`}
                          className="transition-all duration-1000 ease-out"
                        />
                        
                        {/* Lansia segment */}
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="80" 
                          fill="transparent" 
                          stroke="#f97316" 
                          strokeWidth="32"
                          strokeDasharray={`${(stats.persenLansia / 100) * 502} 502`}
                          strokeDashoffset={`-${((stats.persenBalita + stats.persenDewasa) / 100) * 502}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">{stats.totalPenduduk.toLocaleString('id-ID')}</p>
                          <p className="text-xs text-gray-500">Total Jiwa</p>
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Balita (0-5 tahun)</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{stats.balita}</p>
                          <p className="text-xs text-gray-500">{stats.persenBalita}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Dewasa (6-60 tahun)</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{stats.totalPenduduk - stats.balita - stats.lansia}</p>
                          <p className="text-xs text-gray-500">{stats.persenDewasa}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          <span className="text-sm font-medium text-gray-700">Lansia (&gt;60 tahun)</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-600">{stats.lansia}</p>
                          <p className="text-xs text-gray-500">{stats.persenLansia}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">
                  Data diambil dari Database SID | Update Terakhir: Hari ini
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}