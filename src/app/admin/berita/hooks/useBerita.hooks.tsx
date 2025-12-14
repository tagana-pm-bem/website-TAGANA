import { useState, useCallback } from 'react';
import { beritaService, BeritaAcaraDB } from '@/services/beritaService'; 
export const useBerita = () => {
  const [dataBerita, setDataBerita] = useState<BeritaAcaraDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBerita = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await beritaService.getAll();
      setDataBerita(result as unknown as BeritaAcaraDB[]);
    } catch (err: any) {
      console.error("Error fetching berita:", err);
      setError(err.message || "Gagal mengambil data berita");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBerita = async (payload: Omit<BeritaAcaraDB, 'id' | 'created_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await beritaService.create(payload);
      return res;
    } catch (err: any) {
      console.error("Error creating berita:", err);
      setError(err.message || "Gagal menerbitkan berita");
      throw err; 
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBerita = async (id: string) => {
    setIsLoading(true);
    try {
      await beritaService.delete(id);
      setDataBerita((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error("Error deleting berita:", err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dataBerita,
    isLoading,
    error,
    fetchBerita,
    createBerita,
    deleteBerita
  };
};