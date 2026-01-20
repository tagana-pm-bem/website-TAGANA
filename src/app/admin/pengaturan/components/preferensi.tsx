"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, ShieldCheck, Database, Layout } from "lucide-react";
import { toast } from "sonner";

export default function Preferensi() {
  const handleToggle = (title: string) => {
    toast.info("Pengaturan Diperbarui", {
      description: `Fitur ${title} telah diubah statusnya.`
    });
  };

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-[1.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-amber-500">
            <Layout size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900">Preferensi & Notifikasi</CardTitle>
            <CardDescription className="font-medium text-slate-500">Konfigurasi perilaku sistem dan saluran komunikasi.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        <SettingToggle
          icon={<ShieldCheck size={20} className="text-slate-400" />}
          title="Mode Pemeliharaan (Maintenance)"
          description="Nonaktifkan akses publik ke website desa sementara waktu untuk perbaikan."
          onCheckedChange={() => handleToggle("Maintenance Mode")}
        />
        
        <div className="h-px bg-slate-50 w-full" />

        <SettingToggle
          icon={<Bell size={20} className="text-blue-500" />}
          title="Notifikasi Laporan Warga"
          description="Terima email dan notifikasi admin saat ada laporan bencana dari warga."
          defaultChecked
          onCheckedChange={() => handleToggle("Notifikasi Laporan")}
        />

        <div className="h-px bg-slate-50 w-full" />

        <SettingToggle
          icon={<Database size={20} className="text-emerald-500" />}
          title="Backup Data Otomatis"
          description="Lakukan pencadangan basis data sistem secara berkala setiap minggu."
          defaultChecked
          onCheckedChange={() => handleToggle("Auto Backup")}
        />
      </CardContent>
    </Card>
  );
}

function SettingToggle({ title, description, icon, defaultChecked, onCheckedChange }: any) {
  return (
    <div className="flex items-start justify-between gap-6 group">
      <div className="flex gap-4">
        <div className="mt-1">{icon}</div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-slate-800 tracking-tight">{title}</p>
          <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-sm">{description}</p>
        </div>
      </div>
      <Switch 
        defaultChecked={defaultChecked} 
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  );
}