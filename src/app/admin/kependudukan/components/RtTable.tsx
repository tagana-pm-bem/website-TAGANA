'use client';

import React, { useState } from 'react';
import { rtDataByDusun, RTData } from '@/data/datadususn';
import Card from '@/components/ui/card';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { useAlert } from '@/components/ui/Alert';
import { Pencil, Trash2 } from 'lucide-react';

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

export function RtTable() {
  const { showAlert } = useAlert();
  const [selectedDusun, setSelectedDusun] = useState<string>('Miri');
  const [rtData, setRtData] = useState<{ [key: string]: RTData[] }>(rtDataByDusun);
  const [editingItem, setEditingItem] = useState<RTData | null>(null);
  const [deletingItem, setDeletingItem] = useState<RTData | null>(null);
  const [showAll, setShowAll] = useState(false);

  const currentData = rtData[selectedDusun] || [];
  const ITEMS_PER_PAGE = 5;
  const displayData = showAll ? currentData : currentData.slice(0, ITEMS_PER_PAGE);

  const handleEdit = (item: RTData) => {
    setEditingItem(item);
  };

  const handleDelete = (item: RTData) => {
    setDeletingItem(item);
  };

  const handleSaveEdit = (updatedData: any) => {
    const updatedRtData = { ...rtData };
    const index = updatedRtData[selectedDusun].findIndex(
      (item) => item.rt === editingItem?.rt
    );
    
    if (index !== -1) {
      updatedRtData[selectedDusun][index] = {
        rt: updatedData.rt,
        nama: updatedData.nama,
        lp: updatedData.jenisKelamin
      };
      setRtData(updatedRtData);
      
      showAlert({
        type: 'success',
        title: 'Data Berhasil Diperbarui',
        message: `Data RT ${updatedData.rt} berhasil diubah`
      });
    }
    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      const updatedRtData = { ...rtData };
      updatedRtData[selectedDusun] = updatedRtData[selectedDusun].filter(
        (item) => item.rt !== deletingItem.rt
      );
      setRtData(updatedRtData);
      
      showAlert({
        type: 'success',
        title: 'Data Berhasil Dihapus',
        message: `Data RT ${deletingItem.rt} berhasil dihapus`
      });
      setDeletingItem(null);
    }
  };

  const editFields = [
    { name: 'rt', label: 'RT', type: 'text' as const, required: true },
    { name: 'nama', label: 'Nama Kepala RT', type: 'text' as const, required: true },
    { 
      name: 'jenisKelamin', 
      label: 'Jenis Kelamin', 
      type: 'select' as const,
      options: [
        { value: '', label: 'Pilih Jenis Kelamin' },
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' }
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-md">Data RT per Dusun</h1>
        
        <select
          value={selectedDusun}
          onChange={(e) => {
            setSelectedDusun(e.target.value);
            setShowAll(false);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        >
          {DUSUN_LIST.map((dusun) => (
            <option key={dusun} value={dusun}>{dusun}</option>
          ))}
        </select>
      </div>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "RT", "Nama Kepala RT", "Jenis Kelamin", "Aksi"].map((h) => (
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
              {displayData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bg-white shadow-sm rounded-sm py-8 text-center text-gray-500">
                    Tidak ada data RT untuk dusun {selectedDusun}
                  </td>
                </tr>
              ) : (
                displayData.map((item, index) => (
                  <tr key={item.rt}>
                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {index + 1}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium">
                      {item.rt}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {item.nama || '-'}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {item.lp === 'L' ? 'Laki-laki' : item.lp === 'P' ? 'Perempuan' : '-'}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show More/Less Button */}
      {currentData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${currentData.length - ITEMS_PER_PAGE} lainnya)`}
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Total RT di {selectedDusun}: <span className="font-semibold">{currentData.length}</span>
        {!showAll && currentData.length > 0 && ` | Menampilkan: ${Math.min(ITEMS_PER_PAGE, currentData.length)}`}
      </div>

      {editingItem && (
        <EditModal
          title="Edit Data RT"
          fields={editFields}
          initialData={{
            rt: editingItem.rt,
            nama: editingItem.nama || '',
            jenisKelamin: editingItem.lp || ''
          }}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <DeleteModal
          title="Hapus Data RT"
          message={`Apakah Anda yakin ingin menghapus data RT ${deletingItem.rt} - ${deletingItem.nama}?`}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
