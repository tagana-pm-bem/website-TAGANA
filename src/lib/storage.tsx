import { supabase } from "./supabase";

export const BUCKET_NAME = "uploads";

export function getPublicImageUrl(path: string | null) {
  if (!path) return null;

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function uploadToStorage(
  path: string,
  file: File
): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("STORAGE UPLOAD ERROR:", error);
    throw error;
  }
}
