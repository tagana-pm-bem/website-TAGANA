"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import { UploadCloud, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  file: File | null;
  preview: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  className?: string;
}

export default function ImageUpload({
  file,
  preview,
  onChange,
  className = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const processFile = (selectedFile: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan.");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; 
    if (selectedFile.size > maxSizeInBytes) {
       alert("Ukuran file maksimal 5MB.");
       return;
    }

    setIsProcessing(true);

    try {
      const objectUrl = URL.createObjectURL(selectedFile);
      onChange(selectedFile, objectUrl);
    } catch (error) {
      console.error("Error creating preview:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onChange(null, null); 
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClickContainer = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />

      <div
        onClick={handleClickContainer}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full h-48 md:h-56 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden bg-gray-50 flex flex-col items-center justify-center gap-3 group
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
          }
        `}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Loader2 size={32} className="animate-spin text-blue-500" />
            <p className="text-sm font-medium">Memproses...</p>
          </div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />

            {file && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                <div className="flex items-center gap-2 truncate">
                    <ImageIcon size={14} className="text-blue-300 shrink-0" />
                    <span className="text-xs truncate max-w-[150px]">
                    {file.name}
                    </span>
                </div>
                </div>
            )}

            <button
            onClick={handleRemove}
            type="button"
            className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-600 p-1.5 rounded-full transition-all shadow-sm"
            title="Hapus gambar"
            >
            <X size={16} />
            </button>
          </>
        ) : (
          <>
            <div className={`p-3 rounded-full bg-blue-100 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
              <UploadCloud
                size={24}
                className={`text-blue-600 ${isDragging ? 'text-blue-700' : ''}`}
              />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-medium text-gray-700">
                <span className="text-blue-600 hover:underline">Klik upload</span> / drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, WEBP
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}