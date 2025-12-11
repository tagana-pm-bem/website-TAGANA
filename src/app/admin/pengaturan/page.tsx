"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState({
    namaVillage: "Sriharjo",
    kodePosVillage: "55573",
    kabupaten: "Bantul",
    provinsi: "DI Yogyakarta",
    deskripsi: "Desa wisata dengan keindahan alam yang menakjubkan",
  });

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Pengaturan Desa</h1>
        <p className="text-gray-600 mt-1">Kelola informasi dasar desa</p>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form className="space-y-6">
          {/* Nama Desa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Desa
            </label>
            <input
              type="text"
              value={settings.namaVillage}
              onChange={(e) => handleChange("namaVillage", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Kode Pos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kode Pos
            </label>
            <input
              type="text"
              value={settings.kodePosVillage}
              onChange={(e) => handleChange("kodePosVillage", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Kabupaten */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten
              </label>
              <input
                type="text"
                value={settings.kabupaten}
                onChange={(e) => handleChange("kabupaten", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Provinsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi
              </label>
              <input
                type="text"
                value={settings.provinsi}
                onChange={(e) => handleChange("provinsi", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Desa
            </label>
            <textarea
              value={settings.deskripsi}
              onChange={(e) => handleChange("deskripsi", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="primary" size="md">
              Simpan Perubahan
            </Button>
            <Button variant="secondary" size="md">
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
