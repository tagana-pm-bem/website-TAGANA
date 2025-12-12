"use client";

import React from "react";
import { DisasterDetail } from "@/data/datadususn";

interface Props {
  
  dusunName: string;
  disasters: DisasterDetail[] | undefined;
  population: number;
  preparednessMessage: string;
}

export default function RiskCard({
  
  dusunName,
  disasters,
  population,
  preparednessMessage,
}: Props) {
  const riskColors = {
    low: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
      badge: "bg-green-500",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      badge: "bg-yellow-500",
    },
    high: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-700",
      badge: "bg-red-500",
    },
  };

  

  const getDisasterIcon = (iconType: string, severity: string) => {
    const colorClass =
      severity === "high"
        ? "text-red-600"
        : severity === "medium"
        ? "text-yellow-600"
        : "text-green-600";

    const bgClass =
      severity === "high"
        ? "bg-red-100"
        : severity === "medium"
        ? "bg-yellow-100"
        : "bg-green-100";

    switch (iconType) {
      case "flood":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V8m0 0L3 12m4-4l4 4m6 0v8m0 0l4-4m-4 4l-4-4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18M3 12h18" opacity="0.5" />
            </svg>
          </div>
        );
      case "landslide":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7" opacity="0.5" />
            </svg>
          </div>
        );
      case "earthquake":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case "drought":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        );
      case "fire":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
        );
      case "wind":
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${bgClass} p-2 rounded-lg`}>
            <svg className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-gray-300 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex-1 w-full">
          {/* Header Section */}
          <div className=" mb-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Left Side - Status Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">Status Risiko Bencana</p>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-400 w-4 h-4 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-gray-700 font-bold text-xl sm:text-2xl capitalize">
                    Status Bencana
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Potensi Bencana di {dusunName}
                </p>
              </div>

              {/* Right Side - Population Stats */}
              <div className="w-full lg:w-auto bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-300">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2 text-center lg:text-right">
                  Total Penduduk
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#044BB1] text-center lg:text-right">
                  {population.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 font-medium text-center lg:text-right">jiwa</p>
              </div>
            </div>
          </div>
            
            {/* Disaster Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-4 border border-yellow-200">
              {disasters && disasters.length > 0 ? (
                disasters.map((disaster: DisasterDetail, index: number) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center space-x-3 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
                      disaster.severity === "high" 
                        ? "bg-red-50 border-red-500 hover:bg-red-100" 
                        : disaster.severity === "medium" 
                        ? "bg-yellow-50 border-yellow-500 hover:bg-yellow-100" 
                        : "bg-green-50 border-green-500 hover:bg-green-100"
                    }`}
                  >
                    {getDisasterIcon(disaster.icon, disaster.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-base font-bold text-gray-900">{disaster.type}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          disaster.severity === "high" 
                            ? "bg-red-500 text-white" 
                            : disaster.severity === "medium" 
                            ? "bg-yellow-500 text-white" 
                            : "bg-green-500 text-white"
                        }`}>
                          {disaster.severity === "high" ? "TINGGI" : disaster.severity === "medium" ? "SEDANG" : "RENDAH"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{disaster.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 bg-gray-50 rounded-xl">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Data bencana tidak tersedia</p>
                </div>
              )}
            </div>
            
            {/* Legend - Keterangan Warna */}
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base font-bold text-gray-700">Keterangan Tingkat Risiko</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0"></div>
                <div>
                <p className="text-sm font-bold text-gray-900">Risiko Tinggi</p>
                <p className="text-sm text-gray-600">Perlu perhatian khusus</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <div>
                <p className="text-sm font-bold text-gray-900">Risiko Sedang</p>
                <p className="text-sm text-gray-600">Waspada dan siaga</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0"></div>
                <div>
                <p className="text-sm font-bold text-gray-900">Risiko Rendah</p>
                <p className="text-sm text-gray-600">Kondisi relatif aman</p>
                </div>
              </div>
              </div>
            </div>

            {/* Keterangan Tambahan */}
            <div className="mt-4 bg-white/60 rounded-lg p-3 border-l-4 border-blue-500">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Kesiapsiagaan Bencana
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {preparednessMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    
  );
}
