'use client';

import { useState, useEffect, useCallback } from "react";
import { dusunService, DusunDB } from "@/services/dusunService";
import { toast } from "sonner"; // Menggunakan Sonner sesuai standar shadcn terbaru

export function useDusun() {
  const [data, setData] = useState<DusunDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDusun = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dusunService.getAll();
      setData(result);
    } catch (error) {
      console.error(error);
      toast.error("Gagal Mengambil Data", {
        description: "Terjadi kesalahan saat menghubungi server desa.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []); // toast dari sonner tidak perlu masuk dependency array

  useEffect(() => {
    fetchDusun();
  }, [fetchDusun]);

  /**
   * Fungsi untuk memperbarui statistik dusun
   * @param id ID Dusun
   * @param newStats Data statistik yang akan diperbarui
   */
  const updateDusunStats = async (id: number, newStats: Partial<DusunDB>) => {
    try {
      await dusunService.updateStats(id, newStats);
      await fetchDusun(); // Refresh data setelah update
      
      toast.success("Data Diperbarui", {
        description: "Statistik kependudukan berhasil disimpan ke sistem.",
      });
      
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Gagal Update", {
        description: "Sistem gagal menyimpan perubahan data penduduk.",
      });
      return false;
    }
  };

  // Kalkulasi ringkasan statistik untuk dashboard
  const statsSummary = {
    totalDusun: data.length,
    totalPopulation: data.reduce(
      (acc, curr) => acc + (curr.jumlah_penduduk || 0),
      0
    ),
    totalMale: data.reduce(
      (acc, curr) => acc + (curr.jumlah_laki_laki || 0),
      0
    ),
    totalFemale: data.reduce(
      (acc, curr) => acc + (curr.jumlah_perempuan || 0),
      0
    ),
  };

  return {
    data,
    isLoading,
    statsSummary,
    fetchDusun,
    updateDusunStats,
  };
}