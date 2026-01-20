'use client';

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDusun } from "@/hooks/useDusun.hooks";
import { DusunDB } from "@/services/dusunService";
import { toast } from "sonner";

export function useProfileManager() {
  // 1. Integrasi dengan hook utama Dusun
  const { data: dusunList, isLoading: isGlobalLoading, updateDusunStats } = useDusun();

  // 2. State Internal untuk Manajemen Profil
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 3. Derived State: Mendapatkan data dusun yang sedang aktif
  const currentDusun = useMemo(() => {
    if (!selectedId || !dusunList) return null;
    return dusunList.find((d) => d.id === selectedId) || null;
  }, [selectedId, dusunList]);

  // 4. Logika Pemilihan Dusun
  const handleSelectDusun = useCallback((id: string) => {
    const numericId = Number(id);
    setSelectedId(numericId);
    
    // Reset preview saat pindah dusun agar tidak tertukar
    setImagePreview(null);
  }, []);

  // 5. Logika Preview Foto (Demo UI)
  const handleImagePreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  // 6. Sinkronisasi Update ke Database
  const saveProfileUpdate = useCallback(async (payload: Partial<DusunDB>) => {
    if (!selectedId) {
      toast.error("Gagal Menyimpan", { description: "Wilayah dusun belum dipilih." });
      return false;
    }

    setIsUpdating(true);
    try {
      // Menggunakan fungsi update dari hook useDusun untuk sinkronisasi otomatis
      const success = await updateDusunStats(selectedId, payload);
      
      if (success) {
        setImagePreview(null); // Reset preview setelah berhasil simpan
        return true;
      }
      return false;
    } catch (error) {
      console.error("Profile Manager Error:", error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [selectedId, updateDusunStats]);

  return {
    // Data States
    dusunList,
    currentDusun,
    selectedId,
    
    // UI States
    isLoading: isGlobalLoading,
    isUpdating,
    imagePreview,
    
    // Handlers
    handleSelectDusun,
    handleImagePreview,
    saveProfileUpdate,
    setImagePreview
  };
}