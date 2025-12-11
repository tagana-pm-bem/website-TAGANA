"use client";

import React from "react";
import { DisasterDetail } from "@/data/datadususn";

interface Props {
  riskLevel: "low" | "medium" | "high";
  dusunName: string;
  disasters: DisasterDetail[] | undefined;
  population: number;
  preparednessMessage: string;
}

export default function RiskCard({
  riskLevel,
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

  const risk = riskColors[riskLevel];

  const getDisasterIcon = (iconType: string, severity: string) => {
    const colorClass =
      severity === "high"
        ? "text-red-600"
        : severity === "medium"
        ? "text-yellow-600"
        : "text-blue-600";

    switch (iconType) {
      case "flood":
        return (
          <svg className={`w-4 h-4 ${colorClass} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        );
      case "landslide":
        return (
          <svg className={`w-4 h-4 ${colorClass} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      case "earthquake":
        return (
          <svg className={`w-4 h-4 ${colorClass} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${risk.bg} rounded-2xl p-6 sm:p-8 border-l-4 ${risk.border} shadow-xl hover:shadow-2xl transition-shadow duration-300`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <svg
              className="w-5 h-5 text-gray-600"
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
          <div className="flex items-center space-x-3">
            <div className={`${risk.badge} w-4 h-4 rounded-full animate-pulse shadow-lg`}></div>
            <span className={`${risk.text} font-bold text-2xl sm:text-3xl capitalize`}>
              {riskLevel === "low"
                ? "Rendah"
                : riskLevel === "medium"
                ? "Sedang"
                : "Tinggi"}
            </span>
          </div>

          {/* Detail Bencana Potensial */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Potensi Bencana di {dusunName}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {disasters && disasters.length > 0 ? (
                disasters.map((disaster: DisasterDetail, index: number) => (
                  <div key={index} className="flex items-start space-x-2 bg-white/50 rounded-lg p-2">
                    {getDisasterIcon(disaster.icon, disaster.severity)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{disaster.type}</p>
                      <p className="text-xs text-gray-600">{disaster.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4">
                  <p className="text-sm text-gray-500">Data bencana tidak tersedia</p>
                </div>
              )}
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

        <div className="text-center sm:text-right rounded-xl p-4 sm:p-6 shadow-lg">
          <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">
            Total Penduduk
          </p>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#044BB1]">
            {population}
          </p>
          <p className="text-sm text-gray-500 font-medium">jiwa</p>
        </div>
      </div>
    </div>
  );
}
