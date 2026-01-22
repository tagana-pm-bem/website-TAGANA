"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useSweetAlert } from "@/components/ui/SweetAlertProvider";

interface ModalsDeleteProps {
  onClose: () => void;
  // Update tipe agar bisa menangani proses async (Promise)
  onConfirm: () => void | Promise<void>; 
}

export default function ModalsDelete({ onClose, onConfirm }: ModalsDeleteProps) {
  // 1. Hook wajib di dalam component
  const { showDraggableSuccess, showDraggableError } = useSweetAlert();
  
  // State untuk loading tombol
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // 2. Jalankan fungsi hapus dari parent
      await onConfirm();
      
      // 3. Tutup modal manual ini
      onClose();

      // 4. Tampilkan Notifikasi Sukses Draggable
      await showDraggableSuccess("Data Berhasil Dihapus!");

    } catch (error) {
      console.error(error);
      // Opsional: Tampilkan error jika gagal
      showDraggableError("Gagal", "Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center z-50">
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
              disabled={isDeleting}
              className="cursor-pointer text-white flex-1 px-4 bg-blue-400 py-2 rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
            >
              Batal
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="cursor-pointer flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}