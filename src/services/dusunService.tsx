import { supabase } from '@/lib/supabase';
import { uploadImageByType } from '@/services/fileService';
import { getPublicImageUrl } from '@/lib/storage';

export interface DusunDB {
  id: number;
  nama: string;
  
  latitude: number;
  longitude: number;
  deskripsi: string;
  level_resiko: string; 
  gambar_url: string;

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

export interface BencanaItem {
  id: string;
  jenis_bencana: string;
  level_resiko: 'none' | 'low' | 'medium' | 'high';
  deskripsi: string;
  icon: string;
}

export interface RTItem {
  id: string;
  nomor_rt: string;
  nama_ketua: string | null;
  jenis_kelamin_ketua: string | null;
}

export interface DusunWithBencana {
  id: number;
  nama: string;
  bencana: BencanaItem[];
}

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

  getAllNames: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select('id, nama')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as { id: number; nama: string }[];
  },

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
  },

  uploadProfilePhoto: async (file: File) => {
    try {
      const filePath = await uploadImageByType(file, 'dusun');
      const publicUrl = getPublicImageUrl(filePath);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }
};