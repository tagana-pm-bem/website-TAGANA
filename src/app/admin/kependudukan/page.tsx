"use client";

import React, { useState } from "react";
import { StatsCards } from "./components/StatsCards";

import { ResidentsTable } from "./components/ResidentsTable";
import { QuickActions } from "./components/QuickActions";
import { PendudukTable } from "./components/PendudukTable";
import { RtTable } from "./components/RtTable";

interface PopulationData {
  id: string;
  name: string;
  age: number;
  nik: string;
  status: "aktif" | "nonaktif";
}

export default function AdminKependudukanPage() {
  const handleAdd = () => {
    // TODO: implement add modal or navigation
    console.log("Tambah penduduk (action)");
  };

  return (
    <div className="space-y-6 mb-[100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Kependudukan</h1>
          <p className="text-gray-600 mt-1">Kelola data penduduk desa</p>
        </div>
        <QuickActions onAdd={handleAdd} />
      </div>

      <StatsCards />
     
      <PendudukTable />
      <RtTable />

    </div>
  );
}