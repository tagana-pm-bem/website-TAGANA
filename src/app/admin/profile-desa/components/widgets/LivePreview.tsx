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
    <Card className="border-slate-100 shadow-2xl shadow-slate-200/60 rounded-[2rem] overflow-hidden bg-white max-w-2xl mx-auto sticky top-6">
      <CardHeader className="p-0 relative aspect-[16/9] bg-slate-100">
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
            <Globe size={64} strokeWidth={1} />
          </div>
        )}
        
        {/* Floating Badge Risiko */}
        <div className="absolute top-6 left-6">
          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none shadow-lg font-semibold text-sm px-5 py-2 rounded-full">
            Dusun {data.nama || "..."}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-900">Tentang Wilayah</h3>
            <ExternalLink size={18} className="text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-6">
            {data.deskripsi || "Admin belum memasukkan deskripsi untuk wilayah ini. Deskripsi yang informatif membantu masyarakat mengenali potensi desa dengan lebih baik dan memberikan gambaran umum tentang karakteristik wilayah."}
          </p>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* Ringkasan Publik */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5">
            <div className="p-3 bg-blue-500 text-white rounded-xl shadow-md">
              <Users size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none mb-1">Penduduk</span>
              <span className="text-2xl font-bold text-slate-900">{(data.jumlah_penduduk || 0).toLocaleString()}</span>
              <span className="text-xs text-slate-500 mt-0.5">Jiwa</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5">
            <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-md">
              <MapPin size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none mb-1">Lokasi</span>
              <span className="text-sm font-bold text-slate-900">Koordinat Aktif</span>
              <span className="text-xs text-slate-500 mt-0.5">Peta Tersedia</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Badge variant="secondary" className="w-full justify-center bg-slate-50 text-slate-400 border-none py-3 text-xs font-bold uppercase tracking-widest">
            <Globe size={14} className="mr-2" />
            Simulasi Tampilan Publik
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}