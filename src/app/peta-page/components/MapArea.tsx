"use client";

import dynamic from "next/dynamic";
import React from "react";

const PetaSriharjo = dynamic(() => import("./petaSriharjo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#044BB1] mx-auto mb-3"></div>
        <p className="text-gray-600">Memuat Peta...</p>
      </div>
    </div>
  ),
});

interface Props {
  selectedDusunId: number | null;
  onDusunSelect: (id: number | null) => void;
}

export default function MapArea({ selectedDusunId, onDusunSelect }: Props) {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <PetaSriharjo selectedDusunId={selectedDusunId} onDusunSelect={onDusunSelect} />
    </div>
  );
}
