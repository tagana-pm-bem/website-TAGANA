'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react"; // Tambahkan useCallback & useEffect
import { 
  Pencil, 
  Eye, 
  Users, 
  MapPin, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

// SHADCN UI COMPONENTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button"; 
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// IMPORT SERVICE & WIDGET
import { dusunService, DusunDB } from "@/services/dusunService";
import { LivePreview } from "./widgets/LivePreview";

// 1. GLOBAL CACHE (Di luar komponen agar tetap tersimpan saat pindah halaman)
let listDusunCache: DusunDB[] | null = null;

export default function ListProfile() {
  const router = useRouter();
  
  // 2. INITIAL STATE DARI CACHE (Mencegah layar kosong saat kembali ke halaman ini)
  const [dusunList, setDusunList] = useState<DusunDB[]>(listDusunCache || []);
  
  // 3. LOADING HANYA JIKA CACHE BENAR-BENAR KOSONG
  const [isLoading, setIsLoading] = useState(!listDusunCache);

  const fetchDusunData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setIsLoading(true);
      
      const result = await dusunService.getAll();
      const safeData = result || [];
      
      // Update State & Cache
      setDusunList(safeData);
      listDusunCache = safeData;
    } catch (error) {
      console.error("Gagal sinkronisasi daftar dusun:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 4. TRIGGER FETCH SAAT MOUNT
  useEffect(() => {
    // Jika sudah ada cache, lakukan silent update (update di background)
    // Jika belum ada, lakukan loading penuh
    fetchDusunData(!!listDusunCache);
  }, [fetchDusunData]);

  const renderRisikoBadge = (severity: string) => {
    const styles: Record<string, string> = {
      high: "bg-rose-50 text-rose-600 border-rose-100",
      medium: "bg-amber-50 text-amber-600 border-amber-100",
      low: "bg-blue-50 text-blue-600 border-blue-100",
      none: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
    return (
      <Badge variant="outline" className={`${styles[severity] || styles.none} shadow-none font-medium px-3 py-0.5 rounded-lg border`}>
        {severity === 'high' ? 'Risiko Tinggi' : severity === 'medium' ? 'Risiko Sedang' : 'Aman'}
      </Badge>
    );
  };

  // Tampilkan loader hanya jika ini kunjungan pertama kali (Cache masih null)
  if (isLoading && !listDusunCache) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-[#044BB1] opacity-20" />
        <span className="text-sm font-medium animate-pulse uppercase tracking-widest">Sinkronisasi Wilayah...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="overflow-x-auto pb-4">
        <Table className="border-separate border-spacing-y-3">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              {["No", "Wilayah Dusun", "Statistik Ringkas", "Status Risiko", "Aksi"].map((h, idx) => (
                <TableHead key={h} className={`bg-[#BFDBFE] text-slate-800 font-medium text-center h-12 border-none ${idx === 0 ? "rounded-l-xl w-16" : ""} ${idx === 4 ? "rounded-r-xl w-40" : ""}`}>
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dusunList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-400 bg-white border rounded-xl shadow-sm">
                  <AlertCircle className="mx-auto mb-2 opacity-20" size={40} />
                  <p className="text-sm font-medium">Data wilayah belum tersedia.</p>
                </TableCell>
              </TableRow>
            ) : (
              dusunList.map((dusun, index) => (
                <TableRow key={dusun.id} className="hover:bg-transparent border-none group transition-all">
                  <TableCell className="bg-white border-y border-l rounded-l-xl text-center font-medium text-slate-500 shadow-sm">
                    {index + 1}
                  </TableCell>

                  <TableCell className="bg-white border-y font-medium text-slate-900 px-6 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm">Dusun {dusun.nama}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                        <MapPin size={10} /> {dusun.latitude.toFixed(4)}, {dusun.longitude.toFixed(4)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="bg-white border-y px-6 shadow-sm">
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-blue-400" />
                        <span className="text-xs font-medium">{dusun.jumlah_penduduk.toLocaleString()} Jiwa</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="bg-white border-y text-center shadow-sm">
                    {renderRisikoBadge(dusun.level_resiko)}
                  </TableCell>

                  <TableCell className="bg-white border-y border-r rounded-r-xl text-center shadow-sm">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 rounded-lg border-slate-200 text-[#044BB1] hover:bg-blue-50 transition-all font-medium flex items-center gap-2"
                        onClick={() => router.push(`/admin/profile-desa/profile-edit?id=${dusun.id}`)}
                      >
                        <Pencil size={14} />
                        <span className="hidden lg:inline text-xs">Kelola</span>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-lg text-slate-400 hover:text-[#044BB1] transition-all"
                          >
                            <Eye size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[2rem] bg-transparent shadow-none">
                          <DialogHeader className="hidden">
                             <DialogTitle>Preview {dusun.nama}</DialogTitle>
                          </DialogHeader>
                          <LivePreview data={dusun} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}