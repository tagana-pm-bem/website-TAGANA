"use client";

import React from "react";
import { Users, Home, User, UserCheck, Baby, PersonStanding, Accessibility, HandCoins } from "lucide-react";

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
    jumlahPendudukMiskin: number;
  };
}

export default function DemographicsCard({ dusunName, demographicData }: Props) {
  // Config statistik...
  const stats = [
    { label: "Kepala Keluarga", val: demographicData.jumlahKK, icon: <Home size={20} className="text-blue-600"/>, color: "from-blue-50 to-white" },
    { label: "Laki-Laki", val: demographicData.jumlahLakiLaki, icon: <User size={20} className="text-cyan-600"/>, color: "from-cyan-50 to-white" },
    { label: "Perempuan", val: demographicData.jumlahPerempuan, icon: <UserCheck size={20} className="text-pink-600"/>, color: "from-pink-50 to-white" },
    { label: "Balita", val: demographicData.jumlahBalita, icon: <Baby size={20} className="text-purple-600"/>, color: "from-purple-50 to-white" },
    { label: "Lansia", val: demographicData.jumlahLansia, icon: <PersonStanding size={20} className="text-orange-600"/>, color: "from-orange-50 to-white" },
    { label: "Ibu Hamil", val: demographicData.jumlahIbuHamil, icon: <Baby size={20} className="text-rose-600"/>, color: "from-rose-50 to-white" },
    { label: "Disabilitas", val: demographicData.jumlahPenyandangDisabilitas, icon: <Accessibility size={20} className="text-teal-600"/>, color: "from-teal-50 to-white" },
    { label: "Warga Miskin", val: demographicData.jumlahPendudukMiskin, icon: <HandCoins size={20} className="text-emerald-600"/>, color: "from-emerald-50 to-white" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
        <div className="bg-[#044BB1] rounded-lg p-2 mr-3 text-white"><Users size={24}/></div>
        Statistik Demografi
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.color} rounded-xl p-4 border border-white/50 hover:shadow-md transition-all`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white/60 rounded-md">{s.icon}</div>
              <p className="text-xs font-bold text-gray-600 uppercase">{s.label}</p>
            </div>
            <p className="text-2xl font-black text-[#044BB1]">{s.val.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}