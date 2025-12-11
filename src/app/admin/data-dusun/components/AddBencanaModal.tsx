"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AddBencanaModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: { jenisBencana: string; frekuensi: string; tingkatRisiko: string; isPalingDominan: boolean }) => void;
}) {
  const [jenisBencana, setJenisBencana] = useState("");
  const [frekuensi, setFrekuensi] = useState("");
  const [tingkatRisiko, setTingkatRisiko] = useState("");
  const [isPalingDominan, setIsPalingDominan] = useState(false);

  const handleSubmit = () => {
    if (!jenisBencana || !frekuensi || !tingkatRisiko) return;
    onAdd({ jenisBencana, frekuensi, tingkatRisiko, isPalingDominan });
    // reset
    setJenisBencana("");
    setFrekuensi("");
    setTingkatRisiko("");
    setIsPalingDominan(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Bencana</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Bencana</label>
            <input
              type="text"
              value={jenisBencana}
              onChange={(e) => setJenisBencana(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Banjir"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frekuensi</label>
            <input
              type="text"
              value={frekuensi}
              onChange={(e) => setFrekuensi(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Sering musim hujan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Risiko</label>
            <select
              value={tingkatRisiko}
              onChange={(e) => setTingkatRisiko(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih tingkat risiko</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPalingDominan}
              onChange={(e) => setIsPalingDominan(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Paling dominan</span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button variant="primary" size="md" onClick={handleSubmit}>
              Tambah
            </Button>
            <Button variant="secondary" size="md" onClick={onClose}>
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
