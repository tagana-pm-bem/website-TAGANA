"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react"; // Opsional: tambah icon loader jika mau manual loading
import { DisasterDetail } from "@/data/DataBencana";

// 1. Import Hook dari Provider
import { useSweetAlert } from "@/components/ui/SweetAlertProvider";

type Risiko = "none" | "low" | "medium" | "high";

interface ModalsEditProps {
  disaster: DisasterDetail;
  dusunName: string;
  onClose: () => void;
  onSave: (updatedDisaster: DisasterDetail) => void | Promise<void>; // Support async save
}

export default function ModalsEdit({
  disaster,
  dusunName,
  onClose,
  onSave,
}: ModalsEditProps) {
  // 2. Panggil fungsi dari hook
  const {
    showDraggableSuccess,
    showDraggableError,
    confirmSaveChanges,
    showLoading,
  } = useSweetAlert();

  const [formData, setFormData] = useState<DisasterDetail>({ ...disaster });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Validasi Input
    if (!formData.type.trim() || !formData.description.trim()) {
      showDraggableError("Data Tidak Lengkap", "Harap isi jenis bencana dan keterangan.");
      return;
    }

    // 4. Konfirmasi Simpan
    const result = await confirmSaveChanges(
      "Simpan Perubahan?",
      "Simpan",
      
    );

    if (result.isConfirmed) {
      try {
        // Tampilkan loading (opsional)
        showLoading("Menyimpan...", "Sedang memperbarui data");

        // Proses Save (bisa sync atau async)
        await onSave(formData);

        // 5. Tampilkan Sukses Draggable
        await showDraggableSuccess("Data Berhasil Diupdate!");

        // Tutup Modal
        onClose();
      } catch (error) {
        console.error(error);
        // Handle Error
        showDraggableError("Gagal Menyimpan", "Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Bencana - {dusunName}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Bencana
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tingkat Risiko
            </label>
            <select
              value={formData.severity}
              onChange={(e) =>
                setFormData({ ...formData, severity: e.target.value as Risiko })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">Tidak Ada</option>
              <option value="low">Rendah</option>
              <option value="medium">Sedang</option>
              <option value="high">Tinggi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Keterangan</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer shadow-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-500 text-white shadow-md rounded-lg hover:bg-blue-600 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}