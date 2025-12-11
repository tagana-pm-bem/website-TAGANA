"use client";

import React, { useState } from "react";
import { StatsCards } from "./components/StatsCards";
import { ResidentsFilters } from "./components/ResidentsFilters";
import { ResidentsTable } from "./components/ResidentsTable";
import { QuickActions } from "./components/QuickActions";

interface PopulationData {
  id: string;
  name: string;
  age: number;
  nik: string;
  status: "aktif" | "nonaktif";
}

export default function AdminKependudukanPage() {
  const [populationData] = useState<PopulationData[]>([
    {
      id: "1",
      name: "Budi Santoso",
      age: 45,
      nik: "3510021234567890",
      status: "aktif",
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      age: 38,
      nik: "3510021234567891",
      status: "aktif",
    },
    {
      id: "3",
      name: "Ahmad Ramdhani",
      age: 52,
      nik: "3510021234567892",
      status: "aktif",
    },
  ]);

  const handleAdd = () => {
    // TODO: implement add modal or navigation
    console.log("Tambah penduduk (action)");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Kependudukan</h1>
          <p className="text-gray-600 mt-1">Kelola data penduduk desa</p>
        </div>
        <QuickActions onAdd={handleAdd} />
      </div>

      <StatsCards />
      <ResidentsFilters />
      <ResidentsTable data={populationData} />
    </div>
  );
}
