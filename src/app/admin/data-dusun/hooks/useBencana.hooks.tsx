// src/hooks/useBencana.ts
import { useState, useEffect, useCallback } from 'react';
import { bencanaService, BencanaDB } from '@/services/bencanaService';

export function useBencana(dusunId: number | null) {
  const [data, setData] = useState<BencanaDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBencana = useCallback(async () => {
    if (!dusunId) return;

    try {
      setIsLoading(true);
      const result = await bencanaService.getByDusunId(dusunId);
      setData(result);
    } catch (error) {
      console.error('Gagal mengambil data bencana:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dusunId]);

  useEffect(() => {
    fetchBencana();
  }, [fetchBencana]);

  return { data, isLoading, fetchBencana };
}
