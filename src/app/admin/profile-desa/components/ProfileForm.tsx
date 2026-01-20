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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <div className="container mx-auto py-1 max-w-full space-y-8 animate-pulse">
        <Card className="border-none shadow-xl h-[700px] shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 shrink-0">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-2xl bg-slate-200" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 bg-slate-200" />
                <Skeleton className="h-4 w-64 bg-slate-200" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10 flex-1 overflow-y-auto">
            <div className="space-y-4 max-w-md">
              <Skeleton className="h-4 w-32 bg-slate-100" />
              <Skeleton className="h-12 w-full rounded-xl bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4 space-y-4">
                <Skeleton className="h-4 w-32 bg-slate-100" />
                <Skeleton className="aspect-square w-full rounded-[2rem] bg-slate-100" />
              </div>
              <div className="md:col-span-8 space-y-6">
                <Skeleton className="h-4 w-40 bg-slate-100" />
                <Skeleton className="h-56 w-full rounded-2xl bg-slate-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- LOGIKA HANDLER ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      // Memanggil fungsi updateStats dari dusunService
      await dusunService.updateStats(Number(selectedDusunId), {
        deskripsi: deskripsi,
      });

      toast.success("Profil Diperbarui", {
        id: toastId,
        description: "Deskripsi wilayah berhasil disimpan ke sistem."
      });
    } catch (error) {
      toast.error("Gagal Memperbarui", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-1 max-w-full space-y-8 ">
      {/* HEADER CARD */}
      <Card className="border-none shadow-xl h-[700px] shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white flex flex-col">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
              <Building2 size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-medium tracking-tight text-slate-900">
                Profil & Identitas Wilayah
              </CardTitle>
              <CardDescription className="font-medium text-slate-500">
                Kelola deskripsi publik dan representasi visual dusun.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6 flex-1 overflow-y-auto">
          {/* PEMILIHAN DUSUN */}
          <div className="space-y-4 max-w-md">
            <Label className="font-medium text-slate-700 flex items-center gap-2">
              <Map size={14} className="text-slate-400" /> Pilih Wilayah Dusun
            </Label>
            <Select value={selectedDusunId} onValueChange={setSelectedDusunId}>
              <SelectTrigger className="rounded-xl border-slate-200 h-12 focus:ring-blue-100 shadow-sm">
                <SelectValue placeholder="-- Pilih Dusun Target --" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {(dusunList || []).map((d) => (
                  <SelectItem key={d.id} value={d.id.toString()} className="font-medium">
                    {d.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* BAGIAN FOTO */}
            <div className="md:col-span-4 space-y-4">
              <Label className="font-medium text-slate-700 flex items-center gap-2">
                <ImageIcon size={14} className="text-slate-400" /> Foto Utama Wilayah
              </Label>
              <div className="group relative aspect-square w-full rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center transition-all hover:border-[#044BB1]/30">
                {imagePreview ? (
                  <>
                    <Image src={imagePreview} alt="Preview Dusun" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <Label htmlFor="photo-upload" className="cursor-pointer bg-white p-3 rounded-xl text-[#044BB1] hover:bg-slate-50 transition-colors">
                          <Camera size={20} />
                       </Label>
                       <Button variant="destructive" size="icon" className="rounded-xl" onClick={() => setImagePreview(null)}>
                          <Trash2 size={20} />
                       </Button>
                    </div>
                  </>
                ) : (
                  <Label htmlFor="photo-upload" className="flex flex-col items-center gap-2 cursor-pointer text-slate-400 group-hover:text-[#044BB1] transition-colors">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <Camera size={32} />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider">Unggah Foto</span>
                  </Label>
                )}
                <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* BAGIAN DESKRIPSI */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-3">
                <Label className="font-medium text-slate-700 flex items-center gap-2">
                  <Info size={14} className="text-slate-400" /> Deskripsi Publik Wilayah
                </Label>
                <Textarea 
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Ceritakan tentang karakteristik wilayah ini..."
                  className="rounded-2xl border-slate-200 min-h-[220px] p-6 focus:ring-blue-100 font-medium leading-relaxed shadow-sm"
                  disabled={!selectedDusunId}
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleUpdateProfile}
                  disabled={isUpdating || !selectedDusunId}
                  className="bg-[#044BB1] hover:bg-blue-700 text-white px-10 py-7 rounded-2xl font-medium shadow-lg shadow-blue-900/10 gap-3 active:scale-95 transition-all"
                >
                  {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  {isUpdating ? "Memproses..." : "Simpan Perubahan Profil"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FOOTER INFO */}
      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
        <Info size={18} className="text-blue-500 mt-1" />
        <p className="text-sm font-medium text-blue-600/80 leading-relaxed">
          Deskripsi wilayah akan muncul di peta publik. Gunakan bahasa informatif untuk membantu mengenali potensi unik wilayah desa.
        </p>
      </div>
    </div>
  );
}