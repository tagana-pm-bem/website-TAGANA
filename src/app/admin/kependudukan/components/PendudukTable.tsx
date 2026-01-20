'use client';

import { useState } from 'react';
import EditModal from './modals/EditModal';
import { toast } from 'sonner'; // Menggunakan sonner (shadcn default recomendation)
import { useDusun } from '@/hooks/useDusun.hooks';
import { Pencil, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { uploadImageByType } from "@/services/fileService";
import { getPublicImageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/Button";

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
    
    // Gunakan id toast untuk loading state jika ingin lebih advanced
    const toastId = toast.loading("Menyimpan perubahan...");

    try {
      let finalImageUrl = updatedData.gambar_url;

      if (updatedData._imageFile) {
        const filePath = await uploadImageByType(updatedData._imageFile, "dusun");
        finalImageUrl = getPublicImageUrl(filePath);
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
      
      if (success) {
        toast.success("Berhasil!", {
          description: `Data penduduk Dusun ${editingItem.nama} telah diperbarui.`,
          id: toastId,
        });
        setEditingItem(null);
      } else {
        throw new Error("Gagal mengupdate database");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan", {
        description: "Terjadi kesalahan saat memperbarui data.",
        id: toastId,
      });
    }
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
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3 min-h-[300px] bg-white rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin text-[#044BB1]" />
        <span className="text-slate-500 font-medium animate-pulse">Sinkronisasi data penduduk...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-slate-900 tracking-tight">Data Penduduk per Dusun</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola data demografi dan statistik wilayah.</p>
        </div>
      </div>
      
      <div className="border-b border-slate-100" />

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {["No", "Dusun", "KK", "L", "P", "Balita", "Lansia", "Bumil", "Disabilitas", "Miskin", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {displayData.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 text-center text-sm text-slate-600">{index + 1}</td>
                <td className="py-4 text-center text-sm font-bold text-slate-900 whitespace-nowrap px-2">{item.nama}</td>
                <td className="py-4 text-center text-sm font-medium text-slate-700">{item.jumlah_kk}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_laki_laki}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_perempuan}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_balita}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_lansia}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_ibu_hamil}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_disabilitas}</td>
                <td className="py-4 text-center text-sm text-slate-600">{item.jumlah_miskin}</td>
                <td className="py-4">
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-[#044BB1] transition-all"
                    >
                      <Pencil size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {safeData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-2">
            <Button 
              variant="outline"
              onClick={() => setShowAll(!showAll)} 
              className="rounded-xl px-8 font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
            >
                {showAll ? (
                  <> <ChevronUp className="mr-2 h-4 w-4" /> Lihat Lebih Sedikit </>
                ) : (
                  <> <ChevronDown className="mr-2 h-4 w-4" /> Lihat Selengkapnya ({safeData.length - ITEMS_PER_PAGE}) </>
                )}
            </Button>
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