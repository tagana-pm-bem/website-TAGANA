"use client";

import React from "react";

const DUMMY = [
  { title: "Perbaikan Jalan Dusun A Selesai", category: "Infrastruktur", date: "12 Mar 2024", status: "published" },
  { title: "Rapat Koordinasi PKK", category: "Sosial", date: "10 Mar 2024", status: "published" },
  { title: "Penyaluran Bantuan Sosial", category: "Sosial", date: "08 Mar 2024", status: "draft" },
  { title: "Pelatihan UMKM Desa", category: "Ekonomi", date: "05 Mar 2024", status: "published" },
];

export function RecentNewsTable() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Berita Terbaru</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Lihat Semua</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kategori</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{item.title}</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{item.category}</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
