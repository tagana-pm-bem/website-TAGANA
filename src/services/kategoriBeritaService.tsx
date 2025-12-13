import { supabase } from "@/lib/supabase";

export interface KategoriBeritaDB {
  id: number; 
  kategoriBerita: string;
}

export const KategoriBeritaService = {
  getAllNames: async () => {
    const { data, error } = await supabase
      .from("kategori_berita") 
      .select("id, nama") 
      .order("id", { ascending: true });

    if (error) throw error;
    const mappedData = data?.map((item: any) => ({
      id: item.id,
      kategoriBerita: item.nama 
    }));

    return mappedData as { id: number; kategoriBerita: string }[];
  },

  getKategoriById: async (id: number) => {
    const { data, error } = await supabase
      .from("kategori_berita")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      kategoriBerita: data.nama
    } as KategoriBeritaDB;
  },
};