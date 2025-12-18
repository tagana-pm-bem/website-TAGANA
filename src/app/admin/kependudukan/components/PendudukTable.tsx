'use client';

import { useState } from 'react';
import EditModal from './modals/EditModal';
import { useAlert } from '@/components/ui/Alert';
import { useDusun } from '@/hooks/useDusun.hooks';
import { Pencil } from 'lucide-react';

interface DusunDB {
  id: number;
  nama: string;
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
  
  const safeData = pendudukData || [];
  const displayData = showAll ? safeData : safeData.slice(0, ITEMS_PER_PAGE);

  const handleEdit = (item: DusunDB) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editingItem) return;

    const payload = {
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
    return (
      <div className="p-6 flex flex-col items-center justify-center gap-2 min-h-[200px]">
        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-gray-500 mt-2 animate-pulse">Memuat data statistik...</span>
      </div>
    );
  }

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
                    {item.nama} 
                  </td>

                  {/* Perhatikan: snake_case (bukan camelCase) */}
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_kk}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_laki_laki}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_perempuan}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_balita}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_lansia}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_ibu_hamil}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_disabilitas}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.jumlah_miskin}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                      >
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                      {/* Tombol Delete disembunyikan dulu karena logicnya belum ada di service */}
                      {/* <button className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-red-100 transition">
                        <Trash2 size={16} className="text-red-500" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show More/Less Button */}
      {safeData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 cursor-pointer bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${safeData.length - ITEMS_PER_PAGE} lainnya)`}
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Total Dusun: <span className="font-semibold">{safeData.length}</span>
        {!showAll && ` | Menampilkan: ${Math.min(ITEMS_PER_PAGE, safeData.length)}`}
      </div>

      {editingItem && (
        <EditModal
          title={`Edit Data Penduduk - ${editingItem.nama}`}
          fields={editFields}
          initialData={{
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