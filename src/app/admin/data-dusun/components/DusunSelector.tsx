"use client";

import React from "react";
import { RiskBadge } from "./RiskBadge";

interface Dusun {
  id: number;
  nama: string;
  riskLevel: "high" | "medium" | "low";
}

export function DusunSelector({
  dusunList,
  selected,
  onSelect,
}: {
  dusunList: Dusun[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Dusun</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {dusunList.map((dusun) => (
          <button
            key={dusun.id}
            onClick={() => onSelect(dusun.nama)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selected === dusun.nama
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {dusun.nama}
            <RiskBadge level={dusun.riskLevel} />
          </button>
        ))}
      </div>
    </div>
  );
}
