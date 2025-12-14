"use client";

import React from "react";
import {
  Waves,
  Mountain,
  Activity,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Users, // 1. Import icon Users
} from "lucide-react";

import LegendCard from "./LegendCard";

interface RiskItem {
  type: string;
  severity: string;
  description: string;
  icon: string;
}

interface Props {
  riskLevel: string;
  dusunName: string;
  disasters: RiskItem[] | undefined;
  population: number; // 2. Masukkan kembali population ke Interface
  preparednessMessage?: string;
}

export default function RiskCard({
  riskLevel,
  dusunName,
  disasters,
  population, // 3. Ambil population di sini
  preparednessMessage = "Selalu waspada dan ikuti arahan petugas desa jika terjadi keadaan darurat.",
}: Props) {
  const riskColors: Record<string, any> = {
    low: {
      bg: "bg-white",
      border: "border-blue-500",
      text: "text-blue-700",
      badge: "bg-blue-500",
      label: "Rendah",
    },
    medium: {
      bg: "bg-white",
      border: "border-yellow-500",
      text: "text-yellow-700",
      badge: "bg-yellow-500",
      label: "Sedang",
    },
    high: {
      bg: "bg-white",
      border: "border-red-500",
      text: "text-red-700",
      badge: "bg-red-500",
      label: "Tinggi",
    },
    none: {
      bg: "bg-white",
      border: "border-emerald-500",
      text: "text-emerald-700",
      badge: "bg-emerald-500",
      label: "Aman",
    },
  };

  const risk = riskColors[riskLevel] || riskColors.none;

  const getDisasterIcon = (iconKey: string, severity: string) => {
    let colorClass =
      severity === "high"
        ? "text-red-600"
        : severity === "medium"
        ? "text-yellow-600"
        : "text-blue-600";
    const className = `w-5 h-5 ${colorClass} flex-shrink-0 mt-0.5`;

    switch (iconKey?.toLowerCase()) {
      case "flood":
      case "banjir":
        return <Waves className={className} />;
      case "landslide":
      case "tanah longsor":
        return <Mountain className={className} />;
      case "earthquake":
      case "gempa":
        return <Activity className={className} />;
      case "fire":
      case "kebakaran":
        return <Flame className={className} />;
      default:
        return <AlertTriangle className={className} />;
    }
  };

  const getDisasterBgColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100/60 border-red-200";
      case "medium":
        return "bg-yellow-100/60 border-yellow-200";
      case "low":
        return "bg-blue-100/60 border-blue-200";
      default:
        return "bg-gray-100/60 border-gray-200";
    }
  };

  return (
    <div
      className={`${risk.bg} rounded-2xl p-6 border-l-4 border-amber-600 shadow-xl mb-6`}
    >
      {/* Header Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-gray-600" />
          <p className="text-sm text-gray-600 font-semibold uppercase">
            Status Risiko Bencana
          </p>
        </div>

        {/* 4. Tampilan Total Penduduk (Terdampak) */}
        <div className="flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-lg border  border-white/50 shadow-[0px_4px_17px_4px_rgba(50,_50,_93,_0.25)]">
          <Users className="w-5 h-5 text-gray-600" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase">
              Total Penduduk
            </span>
            <span className="text-sm font-bold text-gray-800">
              {population ? population.toLocaleString("id-ID") : 0} Jiwa
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-white/60 px-3 py-2 rounded-lg border border-white/50 shadow-[0px_4px_17px_4px_rgba(50,_50,_93,_0.25)]">
        <p className="text-xs font-bold text-gray-500 uppercase">
          Potensi Bencana di {dusunName}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {disasters && disasters.length > 0 ? (
            disasters.map((disaster, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-xl border ${getDisasterBgColor(disaster.severity)}`}
              >
                {getDisasterIcon(disaster.icon, disaster.severity)}
                <div>
                  <p className="text-sm font-bold text-gray-800 capitalize">
                    {disaster.type}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {disaster.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 flex items-center space-x-3 bg-emerald-100/50 p-4 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-800">
                  Wilayah Aman
                </p>
                <p className="text-xs text-emerald-700">
                  Tidak ada potensi bencana signifikan.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-4">
        <LegendCard />
      </div>
    </div>
  );
}
