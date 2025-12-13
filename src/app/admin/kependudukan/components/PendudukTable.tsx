'use client';

import React, { useState } from 'react';
import { dusunData, Dusun } from '@/data/datadususn';
import Card from '@/components/ui/card';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { useAlert } from '@/components/ui/Alert';
import { Pencil, Trash2 } from 'lucide-react';

export function PendudukTable() {
  const { showAlert } = useAlert();
  const [pendudukData, setPendudukData] = useState<Dusun[]>(dusunData);
  const [editingItem, setEditingItem] = useState<Dusun | null>(null);
  const [deletingItem, setDeletingItem] = useState<Dusun | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const displayData = showAll ? pendudukData : pendudukData.slice(0, ITEMS_PER_PAGE);

  const handleEdit = (item: Dusun) => {
    setEditingItem(item);
  };

  const handleDelete = (item: Dusun) => {
    setDeletingItem(item);
  };

  const handleSaveEdit = (updatedData: any) => {
    const updatedPenduduk = pendudukData.map((item) =>
      item.id === editingItem?.id
        ? {
            ...item,
            jumlahKK: Number(updatedData.jumlahKK),
            jumlahLakiLaki: Number(updatedData.jumlahLakiLaki),
            jumlahPerempuan: Number(updatedData.jumlahPerempuan),
            jumlahBalita: Number(updatedData.jumlahBalita),
            jumlahLansia: Number(updatedData.jumlahLansia),
            jumlahIbuHamil: Number(updatedData.jumlahIbuHamil),
            jumlahPenyandangDisabilitas: Number(updatedData.jumlahPenyandangDisabilitas),
            jumlahPendudukMiskin: Number(updatedData.jumlahPendudukMiskin)
          }
        : item
    );
    
    setPendudukData(updatedPenduduk);
    showAlert({
      type: 'success',
      title: 'Data Berhasil Diperbarui',
      message: `Data penduduk ${editingItem?.name} berhasil diubah`
    });
    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      const updatedPenduduk = pendudukData.filter((item) => item.id !== deletingItem.id);
      setPendudukData(updatedPenduduk);
      
      showAlert({
        type: 'success',
        title: 'Data Berhasil Dihapus',
        message: `Data penduduk ${deletingItem.name} berhasil dihapus`
      });
      setDeletingItem(null);
    }
  };

  const editFields = [
    { name: 'jumlahKK', label: 'Jumlah KK', type: 'number' as const, required: true },
    { name: 'jumlahLakiLaki', label: 'Jumlah Laki-Laki', type: 'number' as const, required: true },
    { name: 'jumlahPerempuan', label: 'Jumlah Perempuan', type: 'number' as const, required: true },
    { name: 'jumlahBalita', label: 'Jumlah Balita', type: 'number' as const, required: true },
    { name: 'jumlahLansia', label: 'Jumlah Lansia', type: 'number' as const, required: true },
    { name: 'jumlahIbuHamil', label: 'Jumlah Ibu Hamil', type: 'number' as const, required: true },
    { name: 'jumlahPenyandangDisabilitas', label: 'Jumlah Penyandang Disabilitas', type: 'number' as const, required: true },
    { name: 'jumlahPendudukMiskin', label: 'Jumlah Penduduk Miskin', type: 'number' as const, required: true }
  ];

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="font-semibold text-md">Data Penduduk per Dusun</h1>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Dusun", "KK", "L", "P", "Balita", "Lansia", "Bumil", "Disabilitas", "Miskin", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className="bg-blue-200 shadow-sm rounded-sm px-4 py-3 text-sm font-semibold text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayData.map((item, index) => (
                <tr key={item.id}>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {index + 1}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium">
                    {item.name}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahKK}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahLakiLaki}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahPerempuan}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahBalita}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahLansia}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahIbuHamil}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahPenyandangDisabilitas}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlahPendudukMiskin}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item)}
                        className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-red-100 transition"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show More/Less Button */}
      {pendudukData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 cursor-pointer bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${pendudukData.length - ITEMS_PER_PAGE} lainnya)`}
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Total Dusun: <span className="font-semibold">{pendudukData.length}</span>
        {!showAll && ` | Menampilkan: ${Math.min(ITEMS_PER_PAGE, pendudukData.length)}`}
      </div>

      {editingItem && (
        <EditModal
          title={`Edit Data Penduduk - ${editingItem.name}`}
          fields={editFields}
          initialData={{
            jumlahKK: editingItem.jumlahKK,
            jumlahLakiLaki: editingItem.jumlahLakiLaki,
            jumlahPerempuan: editingItem.jumlahPerempuan,
            jumlahBalita: editingItem.jumlahBalita,
            jumlahLansia: editingItem.jumlahLansia,
            jumlahIbuHamil: editingItem.jumlahIbuHamil,
            jumlahPenyandangDisabilitas: editingItem.jumlahPenyandangDisabilitas,
            jumlahPendudukMiskin: editingItem.jumlahPendudukMiskin
          }}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <DeleteModal
          title="Hapus Data Penduduk"
          message={`Apakah Anda yakin ingin menghapus data penduduk ${deletingItem.name}?`}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
