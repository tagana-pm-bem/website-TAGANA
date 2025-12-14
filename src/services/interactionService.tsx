import { supabase } from "@/lib/supabase";

export const interactionService = {
  getComments: async (beritaId: string) => {
    const { data, error } = await supabase
      .from("komentar")
      .select("*")
      .eq("berita_id", beritaId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  postComment: async (beritaId: string, nama: string, isi: string) => {
    const { data, error } = await supabase
      .from("komentar")
      .insert({
        berita_id: beritaId,
        nama_pengguna: nama,
        isi_komentar: isi,
      })
      .select()
      .single(); 

    if (error) throw error;
    return data;
  },

  getLikeCount: async (beritaId: string) => {
    const { count, error } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("berita_id", beritaId);

    if (error) throw error;
    return count || 0;
  },

  checkIsLiked: async (beritaId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("berita_id", beritaId)
      .eq("user_id", user.id)
      .maybeSingle(); 

    if (error && error.code !== 'PGRST116') {
        console.error("Error checking like:", error);
    }

    return !!data; 
  },

  toggleLike: async (beritaId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Harap login untuk menyukai berita.");

    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("berita_id", beritaId)
      .eq("user_id", user.id)
      .maybeSingle(); 

    if (existingLike) {
      const { error } = await supabase.from("likes").delete().eq("id", existingLike.id);
      if (error) throw error;
      return false; 
    } else {
      const { error } = await supabase.from("likes").insert({ 
        berita_id: beritaId, 
        user_id: user.id 
      });
      if (error) throw error;
      return true; 
    }
  }
};