'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Camera, 
  Map, 
  Info, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Building2,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// SERVICES & HOOKS
import { dusunService } from "@/services/dusunService";
import { useDusun } from "@/hooks/useDusun.hooks";

// SHADCN UI
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DusunProfilePage() {
  const searchParams = useSearchParams();
  const dusunIdFromUrl = searchParams.get("id");

  const { data: dusunList, isLoading } = useDusun(); // Ambil data & status loading
  
  const [selectedDusunId, setSelectedDusunId] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 1. Logika Sync URL ke State (Hanya sekali saat mount)
  useEffect(() => {
    if (dusunIdFromUrl) {
      setSelectedDusunId(dusunIdFromUrl);
    }
  }, [dusunIdFromUrl]);

  // 2. Logika Ambil data lama ke form saat ID Dusun berubah
  useEffect(() => {
    if (selectedDusunId && dusunList) {
      const selected = dusunList.find(d => d.id === Number(selectedDusunId));
      if (selected) {
        setDeskripsi(selected.deskripsi || "");
        setImagePreview(selected.gambar_url || null);
      }
    }
  }, [selectedDusunId, dusunList]);

  // --- LOADING STATE DENGAN SKELETON ---
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 bg-slate-200" />
          <Skeleton className="h-4 w-64 bg-slate-200" />
        </div>
        <div className="border-b border-gray-300" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-md rounded-lg bg-slate-100" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="aspect-square w-full rounded-2xl bg-slate-100" />
            <Skeleton className="h-64 w-full rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  // --- LOGIKA HANDLER ---

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Simpan file untuk diupload nanti
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.info("Foto Terpilih", { description: "Klik simpan untuk memperbarui secara permanen." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!selectedDusunId) {
      toast.error("Pilih Dusun", { description: "Pilih wilayah yang ingin diperbarui." });
      return;
    }

    setIsUpdating(true);
    const toastId = toast.loading("Menyimpan perubahan profil...");

    try {
      let uploadedImageUrl = undefined;

      // 1. Upload Foto TAPI HANYA JIKA ADA FILE BARU DIPILIH
      if (selectedFile) {
        toast.loading("Mengunggah foto...", { id: toastId });
        uploadedImageUrl = await dusunService.uploadProfilePhoto(selectedFile);
      }

      // 2. update ke database
      await dusunService.updateStats(Number(selectedDusunId), {
        deskripsi: deskripsi,
        ...(uploadedImageUrl && { gambar_url: uploadedImageUrl }), // Update URL jika ada upload baru
      });

      toast.success("Profil Diperbarui", {
        id: toastId,
        description: "Deskripsi dan foto wilayah berhasil disimpan."
      });
      
      // Reset file selection
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Gagal Memperbarui", { id: toastId, description: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      {/* HEADER */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="font-semibold text-lg text-gray-900">Profil & Identitas Wilayah</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola deskripsi dan foto representasi wilayah dusun</p>
        </div>
      </div>

      <div className="border-b border-gray-300" />

      {/* PEMILIHAN DUSUN */}
      <div className="space-y-3">
        <Label className="font-medium text-gray-700 flex items-center gap-2 text-sm">
          <Map size={16} className="text-gray-400" /> Pilih Wilayah Dusun
        </Label>
        <Select value={selectedDusunId} onValueChange={setSelectedDusunId}>
          <SelectTrigger className="max-w-md rounded-lg border-gray-300 h-11 focus:ring-2 focus:ring-blue-500 shadow-sm">
            <SelectValue placeholder="-- Pilih Dusun --" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {(dusunList || []).map((d) => (
              <SelectItem key={d.id} value={d.id.toString()} className="font-medium">
                Dusun {d.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-b border-gray-200" />

      {/* KONTEN UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAGIAN FOTO */}
        <div className="space-y-4">
          <Label className="font-medium text-gray-700 flex items-center gap-2 text-sm">
            <ImageIcon size={16} className="text-gray-400" /> Foto Wilayah
          </Label>
          
          <div className="group relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center transition-all hover:border-blue-400">
            {imagePreview ? (
              <>
                <Image 
                  src={imagePreview} 
                  alt="Preview Dusun" 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Label 
                    htmlFor="photo-upload" 
                    className="cursor-pointer bg-white p-3 rounded-lg text-blue-600 hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    <Camera size={20} />
                  </Label>
                  <button
                    onClick={() => setImagePreview(null)}
                    className="bg-red-500 p-3 rounded-lg text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Label 
                htmlFor="photo-upload" 
                className="flex flex-col items-center gap-3 cursor-pointer text-gray-400 group-hover:text-blue-600 transition-colors p-8"
              >
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 group-hover:border-blue-400 transition-colors">
                  <Camera size={36} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold block">Klik untuk unggah foto</span>
                  <span className="text-xs text-gray-400 mt-1">Format: JPG, PNG (Max 5MB)</span>
                </div>
              </Label>
            )}
            <input 
              id="photo-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
            <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Gunakan foto berkualitas baik yang merepresentasikan karakteristik wilayah dusun.
            </p>
          </div>
        </div>

        {/* BAGIAN DESKRIPSI */}
        <div className="space-y-4">
          <Label className="font-medium text-gray-700 flex items-center gap-2 text-sm">
            <Info size={16} className="text-gray-400" /> Deskripsi Wilayah
          </Label>
          
          <Textarea 
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Masukkan deskripsi wilayah dusun...&#10;&#10;Contoh:&#10;- Lokasi dan batas wilayah&#10;- Karakteristik geografis&#10;- Potensi unggulan&#10;- Informasi penting lainnya"
            className="rounded-lg border-gray-300 min-h-[320px] p-4 focus:ring-2 focus:ring-blue-500 font-normal text-sm leading-relaxed shadow-sm resize-none"
            disabled={!selectedDusunId}
          />

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
            <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Deskripsi ini akan ditampilkan di halaman publik. Gunakan bahasa yang informatif dan mudah dipahami.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200" />

      {/* TOMBOL SIMPAN */}
      <div className="flex justify-end pt-2">
        <Button 
          onClick={handleUpdateProfile}
          disabled={isUpdating || !selectedDusunId}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium shadow-sm gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={18} />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </div>
  );
}