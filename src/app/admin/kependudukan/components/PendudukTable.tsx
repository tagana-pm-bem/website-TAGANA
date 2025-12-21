'use client';

import { useState } from 'react';
import EditModal from './modals/EditModal';
import { useAlert } from '@/components/ui/Alert';
import { useDusun } from '@/hooks/useDusun.hooks';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { uploadImageByType } from "@/services/fileService";
import { getPublicImageUrl } from "@/lib/storage";

interface DusunDB {
  id: number;
  nama: string;
  deskripsi?: string;
  gambar_url?: string; 
  jumlah_kk: number;
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  jumlah_balita: number;
  jumlah_lansia: number;
  jumlah_ibu_hamil: number;
  jumlah_disabilitas: number;
  jumlah_miskin: number;
}

export function PendudukTable() {
  const { data: pendudukData, isLoading, updateDusunStats } = useDusun();
  const { showAlert } = useAlert();
  const [editingItem, setEditingItem] = useState<DusunDB | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const safeData = (pendudukData as unknown as DusunDB[]) || [];
  const displayData = showAll ? safeData : safeData.slice(0, ITEMS_PER_PAGE);

  const handleEdit = (item: DusunDB) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editingItem) return;
    let finalImageUrl = updatedData.gambar_url;

    if (updatedData._imageFile) {
        try {
            const filePath = await uploadImageByType(updatedData._imageFile, "dusun");
            finalImageUrl = getPublicImageUrl(filePath);
        } catch (error) {
            console.error("Gagal upload gambar dusun:", error);
            throw new Error("Gagal mengupload gambar");
        }
    }

    const payload = {
      deskripsi: updatedData.deskripsi,
      gambar_url: finalImageUrl,
      
      jumlah_kk: Number(updatedData.jumlahKK),
      jumlah_laki_laki: Number(updatedData.jumlahLakiLaki),
      jumlah_perempuan: Number(updatedData.jumlahPerempuan),
      jumlah_balita: Number(updatedData.jumlahBalita),
      jumlah_lansia: Number(updatedData.jumlahLansia),
      jumlah_ibu_hamil: Number(updatedData.jumlahIbuHamil),
      jumlah_disabilitas: Number(updatedData.jumlahPenyandangDisabilitas),
      jumlah_miskin: Number(updatedData.jumlahPendudukMiskin)
    };

    const success = await updateDusunStats(editingItem.id, payload);
    if (success) setEditingItem(null);
  };

  const editFields = [
    { name: 'gambar_url', label: 'Foto Dusun', type: 'image' as const, required: false },
    { name: 'deskripsi', label: 'Deskripsi Dusun', type: 'textarea' as const, required: false },
    
    { name: 'jumlahKK', label: 'Jumlah KK', type: 'number' as const, required: true },
    { name: 'jumlahLakiLaki', label: 'Jumlah Laki-Laki', type: 'number' as const, required: true },
    { name: 'jumlahPerempuan', label: 'Jumlah Perempuan', type: 'number' as const, required: true },
    { name: 'jumlahBalita', label: 'Jumlah Balita', type: 'number' as const, required: true },
    { name: 'jumlahLansia', label: 'Jumlah Lansia', type: 'number' as const, required: true },
    { name: 'jumlahIbuHamil', label: 'Jumlah Ibu Hamil', type: 'number' as const, required: true },
    { name: 'jumlahPenyandangDisabilitas', label: 'Jumlah Penyandang Disabilitas', type: 'number' as const, required: true },
    { name: 'jumlahPendudukMiskin', label: 'Jumlah Penduduk Miskin', type: 'number' as const, required: true }
  ];

  if (isLoading) {
    return 
        <div className="p-6 flex flex-col items-center justify-center gap-2 min-h-[200px]">
            <span className="text-gray-500 mt-2 animate-pulse">Memuat data...</span>
        </div>
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="font-semibold text-md">Data Penduduk per Dusun</h1>
      <div className="border-b border-gray-300" />

      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Dusun", "KK", "L", "P", "Balita", "Lansia", "Bumil", "Disabilitas", "Miskin", "Aksi"].map((h) => (
                  <th key={h} className="bg-blue-200 shadow-sm rounded-sm px-4 py-3 text-sm font-semibold text-center whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={item.id}>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{index + 1}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium whitespace-nowrap px-2">{item.nama}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_kk}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_laki_laki}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_perempuan}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_balita}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_lansia}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_ibu_hamil}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_disabilitas}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">{item.jumlah_miskin}</td>
                  <td className="bg-white shadow-sm rounded-sm py-3">
                    <div className="flex justify-center gap-2 px-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {safeData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
            <button onClick={() => setShowAll(!showAll)} className="px-6 py-3 cursor-pointer bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${safeData.length - ITEMS_PER_PAGE} lainnya)`}
            </button>
        </div>
      )}

      {editingItem && (
        <EditModal
          title={`Edit Data Penduduk - ${editingItem.nama}`}
          fields={editFields}
          initialData={{
            gambar_url: editingItem.gambar_url || "", 
            deskripsi: editingItem.deskripsi || "", 
            jumlahKK: editingItem.jumlah_kk,
            jumlahLakiLaki: editingItem.jumlah_laki_laki,
            jumlahPerempuan: editingItem.jumlah_perempuan,
            jumlahBalita: editingItem.jumlah_balita,
            jumlahLansia: editingItem.jumlah_lansia,
            jumlahIbuHamil: editingItem.jumlah_ibu_hamil,
            jumlahPenyandangDisabilitas: editingItem.jumlah_disabilitas,
            jumlahPendudukMiskin: editingItem.jumlah_miskin
          }}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}