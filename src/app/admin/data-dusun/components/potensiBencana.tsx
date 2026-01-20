'use client';

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, AlertCircle, Loader2, History } from "lucide-react";
import { dusunService, DusunWithBencana } from "@/services/dusunService";
import { bencanaService } from "@/services/bencanaService";
import ModalsEdit from "./ModalsEdit";
import ModalsDelete from "./ModalsDelate";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. SESSION CACHE GLOBAL (Di luar komponen agar data tetap ada saat pindah halaman)
let bencanaDataCache: DusunWithBencana[] | null = null;

interface PotensiBencanaProps {
  refreshTrigger?: number; // Prop untuk memicu reload otomatis dari parent
}

export default function PotensiBencana({ refreshTrigger = 0 }: PotensiBencanaProps) {
  // 2. INITIAL STATE DARI CACHE
  const [bencanaData, setBencanaData] = useState<DusunWithBencana[]>(bencanaDataCache || []);
  
  // 3. LOADING HANYA JIKA CACHE KOSONG
  const [isLoading, setIsLoading] = useState(!bencanaDataCache);
  
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    data: any | null; 
    dusunNama: string;
  }>({ isOpen: false, data: null, dusunNama: '' });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const data = await dusunService.getAllWithBencana();
      const safeData = data || [];
      
      // Update State & Cache
      setBencanaData(safeData);
      bencanaDataCache = safeData;
    } catch (error) {
      console.error(error);
      toast.error("Gagal Memperbarui Data", {
        description: "Terjadi gangguan koneksi ke server database.",
        position: "top-center", // Posisi agar mudah dilihat Admin
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 4. EFFECT UNTUK RELOAD OTOMATIS
  useEffect(() => {
    // Selalu fetch saat mount (silent update jika sudah ada cache)
    fetchData(!!bencanaDataCache);
  }, [fetchData, refreshTrigger]);

  const renderRisikoBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-50 shadow-none font-bold">Tinggi</Badge>;
      case "medium":
        return <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50 shadow-none font-bold">Sedang</Badge>;
      case "low":
        return <Badge className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 shadow-none font-bold">Rendah</Badge>;
      default:
        return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 shadow-none font-bold">Aman</Badge>;
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;
    const toastId = toast.loading("Menghapus data bencana...");
    try {
      await bencanaService.delete(deleteModal.id);
      toast.success("Berhasil Dihapus", { 
        id: toastId,
        description: "Data riwayat bencana telah diperbarui.",
        position: "top-center"
      });
      fetchData(true); // Silent reload
      setDeleteModal({ isOpen: false, id: null });
    } catch (error) {
      toast.error("Gagal Menghapus", { id: toastId, position: "top-center" });
    }
  };

  const handleSaveEdit = async (updatedItem: any) => {
    const toastId = toast.loading("Menyimpan perubahan...");
    try {
      const payload = {
        jenis_bencana: updatedItem.type,
        level_resiko: updatedItem.severity,
        deskripsi: updatedItem.description,
      };
      await bencanaService.update(updatedItem.id, payload);
      toast.success("Perubahan Disimpan", { 
        id: toastId,
        description: "Detail potensi bencana berhasil diperbarui.",
        position: "top-center"
      });
      fetchData(true); // Silent reload
      setEditModal({ isOpen: false, data: null, dusunNama: '' });
    } catch (error) {
      toast.error("Gagal Update", { id: toastId, position: "top-center" });
    }
  };

  // Tampilkan loading screen hanya pada kunjungan pertama (Cold Start)
  if (isLoading && !bencanaDataCache) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100 min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#044BB1]" />
        <span className="text-slate-500 font-medium animate-pulse">Menghubungkan ke pusat data...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-2xl ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-[#044BB1] rounded-lg">
                <History size={20} />
            </div>
            <div>
                <h1 className="font-bold text-lg text-slate-900 tracking-tight leading-none mb-1">
                    Riwayat & Potensi Bencana
                </h1>
                <p className="text-sm text-slate-500 font-medium italic">Data tersinkronisasi otomatis</p>
            </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              {["No", "Dusun", "Jenis Bencana", "Tingkat Risiko", "Keterangan", "Aksi"].map((h, idx) => (
                <TableHead 
                  key={h} 
                  className={`
                    bg-[#BFDBFE] text-slate-800 font-bold text-center h-12 border-none
                    ${idx === 0 ? "rounded-l-xl" : ""} 
                    ${idx === 5 ? "rounded-r-xl" : ""}
                  `}
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {bencanaData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-slate-400 bg-slate-50/50 border rounded-xl">
                  <AlertCircle className="mx-auto mb-3 opacity-20" size={48} />
                  <p className="text-sm font-medium">Belum ada data riwayat bencana yang tercatat.</p>
                </TableCell>
              </TableRow>
            ) : (
              bencanaData.map((dusun, dusunIdx) => {
                const disasters = dusun.bencana.length > 0 ? dusun.bencana : [null];
                return disasters.map((disaster, disasterIdx) => (
                  <TableRow key={`${dusun.id}-${disasterIdx}`} className="hover:bg-transparent border-none group">
                    {disasterIdx === 0 && (
                      <TableCell 
                        rowSpan={disasters.length} 
                        className="bg-white border-y border-l rounded-l-xl text-center font-medium text-slate-500 w-12"
                      >
                        {dusunIdx + 1}
                      </TableCell>
                    )}

                    {disasterIdx === 0 && (
                      <TableCell 
                        rowSpan={disasters.length} 
                        className="bg-white border-y border-r font-bold text-slate-900 text-center px-4"
                      >
                        {dusun.nama}
                      </TableCell>
                    )}

                    {disaster ? (
                      <>
                        <TableCell className="bg-white border-y border-x text-center font-medium text-slate-700">
                          {disaster.jenis_bencana}
                        </TableCell>
                        <TableCell className="bg-white border-y border-x text-center">
                          {renderRisikoBadge(disaster.level_resiko)}
                        </TableCell>
                        <TableCell className="bg-white border-y border-x text-left px-6 text-sm text-slate-600 max-w-xs leading-relaxed">
                          {disaster.deskripsi}
                        </TableCell>
                        <TableCell className="bg-white border-y border-r rounded-r-xl text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-xl border-slate-200 text-blue-500 hover:bg-blue-50 transition-all"
                              onClick={() => setEditModal({
                                isOpen: true,
                                dusunNama: dusun.nama,
                                data: {
                                  id: disaster.id,
                                  type: disaster.jenis_bencana,
                                  severity: disaster.level_resiko,
                                  description: disaster.deskripsi
                                }
                              })}
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-xl border-slate-200 text-rose-500 hover:bg-rose-50 transition-all"
                              onClick={() => setDeleteModal({ isOpen: true, id: disaster.id })}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell colSpan={3} className="bg-white border-y border-x text-center text-slate-400 italic">
                          Wilayah terpantau aman
                        </TableCell>
                        <TableCell className="bg-white border-y border-r rounded-r-xl text-center">
                          <Badge variant="outline" className="text-emerald-500 border-emerald-100 bg-emerald-50/30">Stabil</Badge>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ));
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
        <p>Sistem Manajemen Risiko</p>
        <Badge variant="secondary" className="bg-slate-100 text-slate-600 rounded-full font-bold">
          {bencanaData.length} Wilayah Terpantau
        </Badge>
      </div>

      {/* Modals */}
      {editModal.isOpen && editModal.data && (
        <ModalsEdit
          disaster={editModal.data}
          dusunName={editModal.dusunNama}
          onClose={() => setEditModal({ isOpen: false, data: null, dusunNama: '' })}
          onSave={handleSaveEdit}
        />
      )}

      {deleteModal.isOpen && (
        <ModalsDelete
          onClose={() => setDeleteModal({ isOpen: false, id: null })}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}