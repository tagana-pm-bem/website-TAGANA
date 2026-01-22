import { supabase } from "@/lib/supabase";

export interface EventDB {
  id: string;
  title: string;
  description: string;
  event_date: string; 
  start_time: string; 
  end_time?: string;
  location: string;
  image_url?: string;
  status: string;
}

export const eventService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data as EventDB[];
  },

  create: async (payload: Omit<EventDB, "id">) => {
    const { data, error } = await supabase
      .from("events")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, payload: Partial<EventDB>) => {
    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  uploadImage: async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const { data, error } = await supabase.storage
      .from("events") 
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("events")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  }
};