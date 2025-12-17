import { useState, useEffect, useCallback } from 'react';
import { rtService, RTDB } from '@/services/rtService';

export function useRt(selectedDusun: string) {
  const [data, setData] = useState<RTDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi fetch data
  const fetchRt = useCallback(async () => {
    if (!selectedDusun) return;
    
    try {
      setIsLoading(true);
      const result = await rtService.getByDusun(selectedDusun);
      setData(result);
    } catch (error) {
      console.error("Gagal mengambil data RT:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDusun]);

  // Initial load
  useEffect(() => {
    fetchRt();
  }, [fetchRt]);

  // --- UPDATE ---
  const updateRt = async (id: string, payload: any) => {
    try {
      await rtService.update(id, payload);
      await fetchRt(); // Refresh data otomatis
      return true;
    } catch (error) {
      console.error("Gagal update RT:", error);
      // PENTING: Lempar error agar ditangkap oleh SweetAlert di Modal
      throw error; 
    }
  };

  // --- DELETE ---
  const deleteRt = async (id: string) => {
    try {
      await rtService.delete(id);
      await fetchRt(); // Refresh data otomatis
      return true;
    } catch (error) {
      console.error("Gagal hapus RT:", error);
      // PENTING: Lempar error agar ditangkap oleh SweetAlert di Modal
      throw error;
    }
  };

  return { 
    data, 
    isLoading, 
    updateRt, 
    deleteRt,
    mutate: fetchRt // Gunakan ini jika butuh refresh manual dari component
  };
}