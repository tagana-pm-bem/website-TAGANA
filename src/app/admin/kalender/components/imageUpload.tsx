"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="text-blue-400 font-semibold text-md">
        Gambar Banner (opsional)
      </label>

      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-300">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <label
            htmlFor="banner"
            className="h-40 border-2 border-dashed w-full border-gray-300 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
          >
            <ImagePlus className="text-gray-500" size={32} />
            <p className="text-gray-500 text-sm">Klik untuk upload gambar</p>
          </label>
          <input
            id="banner"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}