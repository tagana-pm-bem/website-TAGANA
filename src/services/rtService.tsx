import { supabase } from '@/lib/supabase';

export interface RTDB {
  id: string;
  dusun_id: number;
  nomor_rt: string;
  nama_ketua: string | null;
  jenis_kelamin_ketua: string | null;
  dusun?: { nama: string }; 
}

export const rtService = {
  // --- TAMBAHAN BARU ---
  getDusunIdByName: async (namaDusun: string) => {
    const { data, error } = await supabase
      .from('dusun') // Asumsi nama tabelnya 'dusun'
      .select('id')
      .eq('nama', namaDusun)
      .single();

    if (error) throw new Error("Gagal mendapatkan ID Dusun");
    return data?.id;
  },
  // ---------------------

  create: async (payload: any) => {
    const { data, error } = await supabase
      .from('rt')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  getByDusun: async (namaDusun: string) => {
    const { data, error } = await supabase
      .from('rt')
      .select(`
        *,
        dusun!inner(nama) 
      `)
      .eq('dusun.nama', namaDusun) 
      .order('nomor_rt', { ascending: true });

    if (error) throw error;
    return data as RTDB[];
  },

  update: async (id: string, payload: Partial<RTDB>) => {
    const { data, error } = await supabase
      .from('rt')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('rt').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};