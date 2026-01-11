"use client";

import React from "react";
import { 
  Users, Home, User, UserCheck, Baby, 
  PersonStanding, Accessibility, HeartPulse 
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

export default function DemographicsCard({ dusunName, demographicData }: Props) {
  // Config statistik dengan warna aksen yang lebih elegan dan terpadu
  const stats = [
    { label: "Kepala Keluarga", val: demographicData.jumlahKK, icon: <Home size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Laki-Laki", val: demographicData.jumlahLakiLaki, icon: <User size={18} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Perempuan", val: demographicData.jumlahPerempuan, icon: <UserCheck size={18} />, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Balita", val: demographicData.jumlahBalita, icon: <Baby size={18} />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Lansia", val: demographicData.jumlahLansia, icon: <PersonStanding size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Ibu Hamil", val: demographicData.jumlahIbuHamil, icon: <HeartPulse size={18} />, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Disabilitas", val: demographicData.jumlahPenyandangDisabilitas, icon: <Accessibility size={18} />, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_4px_17px_4px_rgba(50,50,93,0.25)] border border-gray-100 relative overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#044BB1] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Users size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Statistik Demografi
            </h3>
            <p className="text-sm text-gray-500 font-medium">Dusun {dusunName}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => (
          <div 
            key={i} 
            className="group relative bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 ${s.bg} ${s.color} rounded-xl transition-colors`}>
                  {s.icon}
                </div>
              </div>
              
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                    {s.val.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Jiwa</span>
                </div>
              </div>
            </div>

            {/* Subtle Accent Line on Hover */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-[#044BB1] transition-all duration-300 group-hover:w-1/3`} />
          </div>
        ))}
      </div>
    </div>
  );
}