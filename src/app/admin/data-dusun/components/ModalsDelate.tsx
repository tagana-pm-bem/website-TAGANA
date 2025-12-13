"use client";

import { AlertTriangle } from "lucide-react";

interface ModalsDeleteProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalsDelete({ onClose, onConfirm }: ModalsDeleteProps) {
  return (
    <div className="fixed inset-0 flex bg-white/50 items-center justify-center z-50">
      <div className="bg-white backdrop-blur-xs rounded-lg shadow-xl w-full max-w-md p-6 border border-white/20">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Hapus Data Bencana?</h2>
          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data bencana ini? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="cursor-pointer text-white flex-1 px-4 bg-blue-400 py-2  rounded-lg hover:bg-blue-500 transition"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="cursor-pointer flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
