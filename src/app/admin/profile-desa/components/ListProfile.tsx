'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from 'react';
import { 
  Pencil, 
  Eye, 
  Users, 
  MapPin
} from "lucide-react";

// SHADCN UI COMPONENTS
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

// 1. GLOBAL CACHE
let listDusunCache: DusunDB[] | null = null;

export default function ListProfile() {
  const router = useRouter();
  
  // 2. INITIAL STATE DARI CACHE
  const [dusunList, setDusunList] = useState<DusunDB[]>(listDusunCache || []);
  const [isLoading, setIsLoading] = useState(!listDusunCache);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const safeData = dusunList || [];
  const displayData = showAll ? safeData : safeData.slice(0, ITEMS_PER_PAGE);

  const fetchDusunData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setIsLoading(true);
      
      const result = await dusunService.getAll();
      const safeData = result || [];
      
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
    fetchDusunData(!!listDusunCache);
  }, [fetchDusunData]);

  const renderRisikoBadge = (severity: string) => {
    const styles: Record<string, { bg: string; text: string }> = {
      high: { bg: "bg-red-100", text: "text-red-600" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-600" },
      low: { bg: "bg-blue-100", text: "text-blue-600" },
      none: { bg: "bg-green-100", text: "text-green-600" },
    };
    const style = styles[severity] || styles.none;
    const label = severity === 'high' ? 'Risiko Tinggi' : severity === 'medium' ? 'Risiko Sedang' : 'Aman';
    
    return (
      <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-xs font-medium`}>
        {label}
      </span>
    );
  };

  if (isLoading && !listDusunCache) {
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
        <span className="text-gray-500 mt-2 animate-pulse">Memuat data dusun...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-md">Data Profil Dusun</h1>
      </div>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Wilayah Dusun", "Statistik Ringkas", "Status Risiko", "Aksi"].map((h) => (
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
                    Data wilayah belum tersedia.
                  </td>
                </tr>
              ) : (
                displayData.map((dusun, index) => (
                  <tr key={dusun.id}>
                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {index + 1}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 px-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Dusun {dusun.nama}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} /> {dusun.latitude.toFixed(4)}, {dusun.longitude.toFixed(4)}
                        </span>
                      </div>
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 px-4 text-sm">
                      <div className="flex items-center gap-1.5 justify-center">
                        <Users size={14} className="text-blue-400" />
                        <span className="font-medium text-gray-700">{dusun.jumlah_penduduk.toLocaleString()} Jiwa</span>
                      </div>
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {renderRisikoBadge(dusun.level_resiko)}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/profile-desa/profile-edit?id=${dusun.id}`)}
                          className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                        >
                          <Pencil size={16} className="text-blue-500" />
                        </button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
                              <Eye size={16} className="text-gray-500" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[2rem] bg-transparent shadow-none">
                            <DialogHeader className="hidden">
                              <DialogTitle>Preview {dusun.nama}</DialogTitle>
                            </DialogHeader>
                            <LivePreview data={dusun} />
                          </DialogContent>
                        </Dialog>
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
      {safeData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${safeData.length - ITEMS_PER_PAGE} lainnya)`}
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Total Dusun: <span className="font-semibold">{safeData.length}</span>
        {!showAll && safeData.length > 0 && ` | Menampilkan: ${Math.min(ITEMS_PER_PAGE, safeData.length)}`}
      </div>
    </div>
  );
}