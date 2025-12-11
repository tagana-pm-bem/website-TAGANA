"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: number;
  bgIcon: React.ReactNode;
}

function StatCard({ label, value, bgIcon }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 sm:p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all hover:scale-105 duration-300 cursor-pointer relative overflow-hidden">
      {/* Background Icon */}
      {bgIcon}

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-[#044BB1]">{value}</p>
      </div>
    </div>
  );
}

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
  const iconComponents = [
    <svg key="kk" className="absolute right-2 bottom-2 w-16 h-16 text-blue-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>,
    <svg key="male" className="absolute right-2 bottom-2 w-16 h-16 text-blue-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>,
    <svg key="female" className="absolute right-2 bottom-2 w-16 h-16 text-pink-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>,
    <svg key="balita" className="absolute right-2 bottom-2 w-16 h-16 text-green-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
    </svg>,
    <svg key="lansia" className="absolute right-2 bottom-2 w-16 h-16 text-purple-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>,
    <svg key="hamil" className="absolute right-2 bottom-2 w-16 h-16 text-red-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>,
    <svg key="disabil" className="absolute right-2 bottom-2 w-16 h-16 text-orange-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 009 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" />
    </svg>,
    <svg key="miskin" className="absolute right-2 bottom-2 w-16 h-16 text-yellow-100 opacity-50" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>,
  ];

  const stats = [
    { label: "Jumlah KK", value: demographicData.jumlahKK, icon: iconComponents[0] },
    { label: "Laki-laki", value: demographicData.jumlahLakiLaki, icon: iconComponents[1] },
    { label: "Perempuan", value: demographicData.jumlahPerempuan, icon: iconComponents[2] },
    { label: "Balita", value: demographicData.jumlahBalita, icon: iconComponents[3] },
    { label: "Lansia", value: demographicData.jumlahLansia, icon: iconComponents[4] },
    { label: "Ibu Hamil", value: demographicData.jumlahIbuHamil, icon: iconComponents[5] },
    { label: "Disabilitas", value: demographicData.jumlahPenyandangDisabilitas, icon: iconComponents[6] },
    { label: "Penduduk Miskin", value: demographicData.jumlahPendudukMiskin, icon: iconComponents[7] },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg sm:text-xl">
        <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
          <svg
            className="w-6 h-6 text-white"
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
          Data Demografi
          <span className="block text-sm font-normal text-gray-500 mt-1">
            (DAFTAR RUTA IKS 2025)
          </span>
        </span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            bgIcon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
