"use client";

import React, { useState } from "react";
import { beritaBencanaData } from "@/data/beritaBencana";
import { BeritaForm } from "./components/BeritaForm";
import { BeritaItem } from "./components/BeritaItem";

export default function AdminBeritaPage() {
  const [beritaTerkini] = useState(
    beritaBencanaData.slice(0, 5).map((berita) => ({
      id: berita.id,
      title: berita.title,
      date: berita.date,
      status: "published" as const,
      image: berita.image,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kelola Berita</h1>
        <p className="text-gray-600 mt-1">Buat, edit, dan publikasikan berita terkini</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form - 2 kolom */}
        <div className="lg:col-span-2">
          <BeritaForm />
        </div>

        {/* Recent Articles - 1 kolom */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Berita Terkini</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {beritaTerkini.map((berita) => (
              <BeritaItem key={berita.id} {...berita} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
