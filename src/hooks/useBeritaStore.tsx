import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BeritaState {
  allBerita: any[];
  setAllBerita: (data: any[]) => void;
  clearBerita: () => void;
}

export const useBeritaStore = create<BeritaState>()(
  persist(
    (set) => ({
      allBerita: [],
      setAllBerita: (data) => set({ allBerita: data }),
      clearBerita: () => set({ allBerita: [] }),
    }),
    {
      name: 'berita-bencana-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);