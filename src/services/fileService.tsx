import { uploadToStorage } from "@/lib/storage";
import { STORAGE_FOLDER } from "@/lib/storageMapping";

type FolderKey = keyof typeof STORAGE_FOLDER;

export async function uploadImageByType(
  file: File,
  type: FolderKey
): Promise<string> {
  if (!file) throw new Error("File tidak valid");

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const folder = STORAGE_FOLDER[type];
  const filePath = `${folder}/${fileName}`;

  await uploadToStorage(filePath, file);

  return filePath;
}
