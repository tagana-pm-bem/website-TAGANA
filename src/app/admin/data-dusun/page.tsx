"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DusunSelector } from "./components/DusunSelector";
import { BencanaTable } from "./components/BencanaTable";
import { AddBencanaModal } from "./components/AddBencanaModal";

interface BencanaData {
  id: number;
  jenisBencana: string;
  frekuensi: string;
  tingkatRisiko: "Tinggi" | "Sedang" | "Rendah";
  statusPrioritas: "Paling Tinggi" | "Biasa";
}

interface Dusun {
  id: number;
  nama: string;
  riskLevel: "high" | "medium" | "low";
}

export default function DataDusunPage() {
  const [selectedDusun, setSelectedDusun] = useState<string>("Dusun Krajan Timur");
  const [showAddModal, setShowAddModal] = useState(false);

  const dusunList: Dusun[] = [
    { id: 1, nama: "Dusun Krajan Timur", riskLevel: "high" },
    { id: 2, nama: "Dusun Sanggrahan", riskLevel: "medium" },
    { id: 3, nama: "Dusun Gatak", riskLevel: "high" },
    { id: 4, nama: "Dusun Jetis", riskLevel: "low" },
    { id: 5, nama: "Dusun Kebonrejo", riskLevel: "medium" },
  ];

  const [bencanaData, setBencanaData] = useState<BencanaData[]>([
    {
      id: 1,
      jenisBencana: "Tanah Longsor",
      frekuensi: "Sering (Musim Hujan)",
      tingkatRisiko: "Tinggi",
      statusPrioritas: "Paling Tinggi",
    },
    {
      id: 2,
      jenisBencana: "Angin Puting Beliung",
      frekuensi: "Jarang",
      tingkatRisiko: "Sedang",
      statusPrioritas: "Biasa",
    },
    {
      id: 3,
      jenisBencana: "Kekeringan",
      frekuensi: "Musiman (Kemarau)",
      tingkatRisiko: "Sedang",
      statusPrioritas: "Biasa",
    },
  ]);

  const handleAdd = (payload: { jenisBencana: string; frekuensi: string; tingkatRisiko: string; isPalingDominan: boolean }) => {
    const newItem: BencanaData = {
      id: bencanaData.length + 1,
      jenisBencana: payload.jenisBencana,
      frekuensi: payload.frekuensi,
      tingkatRisiko: payload.tingkatRisiko as BencanaData["tingkatRisiko"],
      statusPrioritas: payload.isPalingDominan ? "Paling Tinggi" : "Biasa",
    };
    setBencanaData((prev) => [...prev, newItem]);
  };

  const handleDelete = (id: number) => setBencanaData((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Data Bencana Per Dusun</h1>
        <p className="text-gray-600 mt-1">Kelola data bencana untuk setiap dusun</p>
      </div>
      <DusunSelector dusunList={dusunList} selected={selectedDusun} onSelect={setSelectedDusun} />
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Daftar Bencana - {selectedDusun}</h3>
        <Button variant="primary" size="md" onClick={() => setShowAddModal(true)}>
          Tambah Bencana
        </Button>
      </div>
      
      <BencanaTable data={bencanaData} onDelete={handleDelete} />
      <AddBencanaModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
    </div>
  );
}
