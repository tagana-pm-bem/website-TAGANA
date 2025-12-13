"use client";

import React from "react";

interface PopulationData {
  id: string;
  name: string;
  age: number;
  nik: string;
  status: "aktif" | "nonaktif";
}

export function ResidentsTable({ data }: { data: PopulationData[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Usia</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NIK</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{person.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.age} tahun</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.nik}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      person.status === "aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {person.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="cursor-pointer text-blue-600 hover:text-blue-900 font-medium">Edit</button>
                  <button className="cursor-pointer text-red-600 hover:text-red-900 font-medium">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
