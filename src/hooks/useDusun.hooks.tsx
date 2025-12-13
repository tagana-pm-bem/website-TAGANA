import { useState, useEffect, useCallback } from "react";
import { dusunService, DusunDB } from "@/services/dusunService";
import { useAlert } from "@/components/ui/Alert";

export function useDusun() {
  const [data, setData] = useState<DusunDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  const fetchDusun = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dusunService.getAll();
      setData(result);
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Error",
        message: "Gagal mengambil data dusun",
      });
    } finally {
      setIsLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchDusun();
  }, [fetchDusun]);

  const updateDusunStats = async (id: number, newStats: Partial<DusunDB>) => {
    try {
      await dusunService.updateStats(id, newStats);
      await fetchDusun();
      showAlert({
        type: "success",
        title: "Sukses",
        message: "Data berhasil diperbarui",
      });
      return true;
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Gagal",
        message: "Gagal update data",
      });
      return false;
    }
  };

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
