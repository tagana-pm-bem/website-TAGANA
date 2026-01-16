'use client';

import Image from "next/image";
import { MapPin, Users, Globe, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { DusunDB } from "@/services/dusunService";

interface LivePreviewProps {
  data: Partial<DusunDB>;
  previewImage?: string | null;
}

export function LivePreview({ data, previewImage }: LivePreviewProps) {
  return (
    <Card className="border-slate-100 shadow-2xl shadow-slate-200/60 rounded-[2rem] overflow-hidden bg-white max-w-sm mx-auto sticky top-6">
      <CardHeader className="p-0 relative aspect-[4/3] bg-slate-100">
        {/* Gambar Utama Profil */}
        {previewImage || data.gambar_url ? (
          <Image 
            src={previewImage || data.gambar_url || ""} 
            alt="Preview" 
            fill 
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <Globe size={48} strokeWidth={1} />
          </div>
        )}
        
        {/* Floating Badge Risiko */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none shadow-sm font-medium text-[10px] px-3 py-1 rounded-full">
            Dusun {data.nama || "..."}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">Tentang Wilayah</h3>
            <ExternalLink size={14} className="text-slate-400" />
          </div>
          <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-4">
            {data.deskripsi || "Admin belum memasukkan deskripsi untuk wilayah ini. Deskripsi yang informatif membantu masyarakat mengenali potensi desa."}
          </p>
        </div>

        <div className="h-px bg-slate-50 w-full" />

        {/* Ringkasan Publik */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Users size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 leading-none">Penduduk</span>
              <span className="text-xs font-medium text-slate-800">{(data.jumlah_penduduk || 0).toLocaleString()} Jiwa</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 text-slate-600 rounded-lg">
              <MapPin size={14} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-medium text-slate-400 leading-none">Lokasi</span>
              <span className="text-[10px] font-medium text-slate-800">Koordinat Aktif</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Badge variant="secondary" className="w-full justify-center bg-slate-50 text-slate-400 border-none py-1.5 text-[9px] font-medium uppercase tracking-widest">
            Simulasi Tampilan Publik
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}