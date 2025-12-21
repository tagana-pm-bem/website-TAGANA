"use client";

import { CloudUpload, ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  file: File | null;
  preview: string | null;
  onChange: (file: File | null, preview: string | null) => void;
}

export default function ImageUpload({
  file,
  preview,
  onChange,
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const previewUrl = URL.createObjectURL(selectedFile);
    onChange(selectedFile, previewUrl);
  };

  const removeImage = () => {
    onChange(null, null);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="font-semibold text-sm">Media (Gambar)</label>

      {!preview ? (
        <>
          <label
            htmlFor="banner"
            className="
              h-40 border-2 border-dashed w-full border-gray-300 
              rounded-xl cursor-pointer
              flex flex-col items-center justify-center
              gap-2
              hover:border-blue-400 hover:bg-blue-50/30
              transition-all
            "
          >
            <CloudUpload className="text-gray-500" size={60} />
            <p className="text-gray-500 text-sm">Klik untuk upload gambar</p>
            <p className="text-xs">JPG / PNG (Max 5MB)</p>
          </label>

          <input
            id="banner"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <div className="relative w-full">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-xl border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
