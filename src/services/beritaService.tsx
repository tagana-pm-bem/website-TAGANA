import { supabase } from "@/lib/supabase";

export interface BeritaAcaraDB {
  id: string;
  judul: string;
  tanggal: string;
  isi_berita: string | null;
  lokasi?: string | null;
  penulis: string;
  file_url?: string | null;
  kategori_berita_id: number;
  status?: string;
  created_at?: string;
}

export const beritaService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("berita_acara")
      .select(
        `
        *,
        kategori_berita (
          id,
          nama
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("berita_acara")
      .select(
        `
        *,
        kategori_berita (
          id,
          nama
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (payload: Omit<BeritaAcaraDB, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("berita_acara")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("berita_acara").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  update: async (id: string, payload: Partial<BeritaAcaraDB>) => {
    const { data, error } = await supabase
      .from("berita_acara")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
