"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Home, User, UserCheck, Baby, 
  PersonStanding, Accessibility, HeartPulse,
  Info, ChevronRight
} from "lucide-react";

interface Props {
  dusunName: string;
  demographicData: {
    jumlahKK: number;
    jumlahLakiLaki: number;
    jumlahPerempuan: number;
    jumlahBalita: number;
    jumlahLansia: number;
    jumlahIbuHamil: number;
    jumlahPenyandangDisabilitas: number;
  };
}

export default function DemographicsTable({ dusunName, demographicData }: Props) {
  const totalJiwa = demographicData.jumlahLakiLaki + demographicData.jumlahPerempuan;
  const maxGender = Math.max(demographicData.jumlahLakiLaki, demographicData.jumlahPerempuan);

  return (
    <div className="w-full  mx-auto px-4 sm:px-6 lg:px-1 py-2 md:py-2 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl md:rounded-2xl shadow-xl border border-gray-300 overflow-hidden"
      >
        {/* --- HEADER --- */}
        <div className="p-4 md:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#044BB1] rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
              <Users size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-bold text-slate-800 tracking-tight">Rincian Demografi & Kelompok Rentan</h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium">Dusun {dusunName}</p>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            
            {/* LEFT: KOMPOSISI GENDER */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-200"
            >
              <h4 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 md:mb-5">Komposisi Gender</h4>
              
              <div className="space-y-4 md:space-y-5">
                {/* Laki-laki */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <User size={16} className="md:w-5 md:h-5" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-slate-700">Laki-laki</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-slate-900 tabular-nums">
                      {demographicData.jumlahLakiLaki.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="w-full h-2 md:h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(demographicData.jumlahLakiLaki / maxGender) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Perempuan */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center">
                        <UserCheck size={16} className="md:w-5 md:h-5" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-slate-700">Perempuan</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-slate-900 tabular-nums">
                      {demographicData.jumlahPerempuan.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="w-full h-2 md:h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(demographicData.jumlahPerempuan / maxGender) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-pink-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: DATA KELOMPOK RENTAN */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-200"
            >
              <h4 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide mb-3 md:mb-4">Data Kelompok Rentan</h4>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {/* Lansia */}
                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-slate-600">Lansia</span>
                    <PersonStanding size={14} className="md:w-4 md:h-4 text-emerald-600" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 tabular-nums">
                    {demographicData.jumlahLansia}
                  </p>
                </div>

                {/* Ibu Hamil */}
                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-slate-600">Ibu Hamil</span>
                    <HeartPulse size={14} className="md:w-4 md:h-4 text-pink-600" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 tabular-nums">
                    {demographicData.jumlahIbuHamil}
                  </p>
                </div>

                {/* Disabilitas */}
                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-slate-600">Disabilitas</span>
                    <Accessibility size={14} className="md:w-4 md:h-4 text-violet-600" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 tabular-nums">
                    {demographicData.jumlahPenyandangDisabilitas}
                  </p>
                </div>

                {/* Balita */}
                <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-slate-600">Balita</span>
                    <Baby size={14} className="md:w-4 md:h-4 text-amber-600" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 tabular-nums">
                    {demographicData.jumlahBalita}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM: KEPALA KELUARGA (Full Width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-blue-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Home size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wide">Kepala Keluarga Terdaftar</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 font-medium">Total KK di Dusun {dusunName}</p>
                </div>
              </div>
              <div className="self-end sm:self-auto">
                <span className="text-2xl md:text-4xl font-bold text-blue-600 tabular-nums">
                  {demographicData.jumlahKK.toLocaleString('id-ID')}
                </span>
                <span className="ml-2 text-sm md:text-base font-bold text-blue-400">KK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- FOOTER --- */}
        <div className="px-4 md:px-6 py-3 md:py-4 bg-slate-50/30 border-t border-slate-100 text-center">
          <p className="text-[10px] md:text-xs font-medium text-slate-400 italic">
            * Data diperbarui secara berkala berdasarkan sinkronisasi sistem desa.
          </p>
        </div>
      </motion.div>
    </div>
  );
}