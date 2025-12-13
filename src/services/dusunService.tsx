import { supabase } from '@/lib/supabase';

// 1. Interface Sesuai Kolom Tabel 'dusun' (Database)
export interface DusunDB {
  id: number;
  nama: string;
  
  // Data Spasial & Profil (Penting untuk Peta)
  latitude: number;
  longitude: number;
  deskripsi: string;
  level_resiko: string; // 'low', 'medium', 'high', 'none'
  gambar_url: string;

  // Data Statistik
  jumlah_penduduk: number;
  jumlah_kk: number;
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  jumlah_balita: number;
  jumlah_lansia: number;
  jumlah_ibu_hamil: number;
  jumlah_disabilitas: number;
  jumlah_miskin: number;
}

// 2. Interface untuk Relasi Bencana (Tabel Bencana)
export interface BencanaItem {
  id: string;
  jenis_bencana: string;
  level_resiko: 'none' | 'low' | 'medium' | 'high';
  deskripsi: string;
  icon: string;
}

// 3. Interface untuk Relasi RT (Tabel RT)
export interface RTItem {
  id: string;
  nomor_rt: string;
  nama_ketua: string | null;
  jenis_kelamin_ketua: string | null;
}

// 4. Interface Dusun + List Bencana (Untuk Tabel Potensi Bencana)
export interface DusunWithBencana {
  id: number;
  nama: string;
  bencana: BencanaItem[];
}

// 5. Interface LENGKAP (Detail Page: Dusun + RT + Bencana)
export interface DusunDetailDB extends DusunDB {
  rt: RTItem[];
  bencana: BencanaItem[];
}

export const dusunService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select('*') 
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as DusunDB[];
  },

  // Ambil Hanya Nama & ID (Untuk Dropdown Form biar ringan)
  getAllNames: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select('id, nama')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as { id: number; nama: string }[];
  },

  // Ambil Dusun + List Bencana (Untuk Halaman Tabel Risiko)
  getAllWithBencana: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select(`
        id,
        nama,
        bencana (
          id,
          jenis_bencana,
          level_resiko,
          deskripsi,
          icon
        )
      `)
      .order('id', { ascending: true });

    if (error) throw error;
    return data as DusunWithBencana[];
  },

  getDetailById: async (id: number) => {
    const { data, error } = await supabase
      .from('dusun')
      .select(`
        *,
        rt (*),       
        bencana (*)   
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    
    if (data && data.rt) {
      data.rt.sort((a: any, b: any) => a.nomor_rt.localeCompare(b.nomor_rt));
    }

    return data as DusunDetailDB;
  },

  updateStats: async (id: number, stats: Partial<DusunDB>) => {
    const { data, error } = await supabase
      .from('dusun')
      .update(stats)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};