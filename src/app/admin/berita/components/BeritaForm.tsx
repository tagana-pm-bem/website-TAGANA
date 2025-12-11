"use client";

import React, { useState } from "react";
import { useAlert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

interface BeritaFormProps {
  onPublish?: (data: BeritaFormData) => void;
  onSaveDraft?: (data: BeritaFormData) => void;
}

export interface BeritaFormData {
  judulBerita: string;
  kategori: string;
  isiBerita: string;
  mediaFile: File | null;
}

export function BeritaForm({ onPublish, onSaveDraft }: BeritaFormProps) {
  const { showAlert } = useAlert();
  const [judulBerita, setJudulBerita] = useState("");
  const [kategori, setKategori] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handlePublish = () => {
    if (!judulBerita || !kategori || !isiBerita) {
      showAlert({
        type: 'warning',
        title: 'Data Belum Lengkap',
        message: 'Mohon lengkapi judul, kategori, dan isi berita sebelum mempublikasikan.',
      });
      return;
    }

    const formData = { judulBerita, kategori, isiBerita, mediaFile };
    onPublish?.(formData);

    showAlert({
      type: 'success',
      title: 'Berita Berhasil Dipublikasikan!',
      message: `"${judulBerita}" telah dipublikasikan dan dapat dilihat oleh pengunjung.`,
    });

    resetForm();
  };

  const handleSaveDraft = () => {
    if (!judulBerita) {
      showAlert({
        type: 'error',
        title: 'Gagal Menyimpan Draft',
        message: 'Judul berita harus diisi untuk menyimpan draft.',
      });
      return;
    }

    const formData = { judulBerita, kategori, isiBerita, mediaFile };
    onSaveDraft?.(formData);

    showAlert({
      type: 'info',
      title: 'Draft Tersimpan',
      message: `Draft "${judulBerita}" telah disimpan. Anda dapat melanjutkan nanti.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 50 * 1024 * 1024;

      if (file.size > maxSize) {
        showAlert({
          type: 'error',
          title: 'File Terlalu Besar',
          message: 'Ukuran file maksimal 50MB. Silakan pilih file yang lebih kecil.',
        });
        return;
      }

      setMediaFile(file);
      showAlert({
        type: 'success',
        title: 'File Berhasil Diunggah',
        message: `${file.name} siap untuk dipublikasikan.`,
      });
    }
  };

  const resetForm = () => {
    setJudulBerita("");
    setKategori("");
    setIsiBerita("");
    setMediaFile(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Berita Baru</h2>

      <div className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Berita</label>
          <input
            type="text"
            value={judulBerita}
            onChange={(e) => setJudulBerita(e.target.value)}
            placeholder="Masukkan judul berita..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih kategori...</option>
            <option value="bencana">Bencana</option>
            <option value="peristiwa">Peristiwa</option>
            <option value="pengumuman">Pengumuman</option>
            <option value="kebijakan">Kebijakan</option>
          </select>
        </div>

        {/* Isi Berita */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Isi Berita</label>
          <textarea
            value={isiBerita}
            onChange={(e) => setIsiBerita(e.target.value)}
            placeholder="Masukkan isi berita..."
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar/Media</label>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {mediaFile && (
            <p className="text-sm text-green-600 mt-2">✓ {mediaFile.name}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="success" onClick={handlePublish}>
            Publikasikan
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Simpan Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
