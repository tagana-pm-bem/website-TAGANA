"use client";

import Image from "next/image";
import { Camera, Save, Trash2, Upload, Building2, MapPin, Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ProfilDesa() {
  const handleSave = () => {
    toast.success("Perubahan Disimpan", {
      description: "Informasi profil desa telah diperbarui secara global."
    });
  };

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-[1.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
            <Building2 size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900">Profil Desa / Instansi</CardTitle>
            <CardDescription className="font-medium text-slate-500">Kelola identitas resmi dan kontak operasional desa.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-10">
        {/* LOGO SECTION */}
        <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-50">
          <div className="relative group w-32 h-32 shrink-0">
            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-md ring-4 ring-slate-50">
              <Image src="/ketos.png" alt="Logo Desa" fill className="object-cover" />
            </div>
            <button className="absolute inset-0 rounded-[2rem] bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[2px]">
              <div className="flex flex-col items-center text-white text-xs font-bold gap-1">
                <Camera size={20} />
                <span>Ganti Logo</span>
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Logo Resmi Desa</h4>
              <p className="text-xs font-medium text-slate-400 mt-1">Format JPG, PNG atau SVG. Maksimal 2MB.</p>
            </div>
            <div className="flex gap-3 justify-center sm:justify-start">
              <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-10">
                <Upload size={16} /> Upload
              </Button>
              <Button variant="ghost" className="rounded-xl font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 h-10">
                <Trash2 size={16} /> Hapus
              </Button>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <Building2 size={14} className="text-[#044BB1]" /> Nama Desa
            </Label>
            <Input placeholder="Masukkan nama desa..." className="rounded-xl border-slate-200 h-11" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#044BB1]" /> Kode Desa (Kemendagri)
            </Label>
            <Input placeholder="Masukkan kode desa..." className="rounded-xl border-slate-200 h-11" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <User size={14} className="text-[#044BB1]" /> Kepala Desa
            </Label>
            <Input placeholder="Nama Kepala Desa..." className="rounded-xl border-slate-200 h-11" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#044BB1]" /> Kecamatan
            </Label>
            <Input placeholder="Nama kecamatan..." className="rounded-xl border-slate-200 h-11" />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#044BB1]" /> Alamat Kantor Desa
            </Label>
            <Textarea rows={3} placeholder="Alamat lengkap kantor..." className="rounded-xl border-slate-200 resize-none p-4" />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <Mail size={14} className="text-[#044BB1]" /> Email Resmi
            </Label>
            <Input type="email" placeholder="contoh@desa.go.id" className="rounded-xl border-slate-200 h-11" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <Phone size={14} className="text-[#044BB1]" /> Nomor Telepon
            </Label>
            <Input placeholder="08xxxxxxxxxx" className="rounded-xl border-slate-200 h-11" />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-50">
          <Button 
            onClick={handleSave}
            className="bg-[#044BB1] hover:bg-blue-700 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-blue-900/10 gap-2 active:scale-95 transition-all"
          >
            <Save size={18} /> Simpan Perubahan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}