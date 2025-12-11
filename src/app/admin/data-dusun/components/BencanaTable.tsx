"use client";

import React from "react";

interface BencanaData {
  id: number;
  jenisBencana: string;
  frekuensi: string;
  tingkatRisiko: "Tinggi" | "Sedang" | "Rendah";
  statusPrioritas: "Paling Tinggi" | "Biasa";
}

export function BencanaTable({ data, onDelete }: { data: BencanaData[]; onDelete: (id: number) => void }) {
  const getRisikoColor = (risiko: string) => {
    switch (risiko) {
      case "Tinggi":
        return "text-red-600 bg-red-50";
      case "Sedang":
        return "text-yellow-600 bg-yellow-50";
      case "Rendah":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPrioritasColor = (prioritas: string) => {
    if (prioritas === "Paling Tinggi") {
      return "text-red-700 bg-red-100 border-red-300";
    }
    return "text-gray-700 bg-gray-100 border-gray-300";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis Bencana</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Frekuensi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tingkat Risiko</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prioritas</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((bencana) => (
              <tr key={bencana.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{bencana.jenisBencana}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{bencana.frekuensi}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRisikoColor(bencana.tingkatRisiko)}`}>
                    {bencana.tingkatRisiko}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPrioritasColor(bencana.statusPrioritas)}`}>
                    {bencana.statusPrioritas}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => onDelete(bencana.id)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
