"use client";

import { Map, Info, Layers } from "lucide-react";
import ListProfile from "./components/ListProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

/**
 * Dashboard Utama Profil Desa
 * Menampilkan ringkasan seluruh wilayah dusun
 */
export default function ProfileDesaPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white overflow-hidden">
        <CardHeader className="p-8 bg-slate-50/50 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
              <Layers size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-medium text-slate-900 tracking-tight">
                Direktori Profil Wilayah
              </CardTitle>
              <CardDescription className="font-medium text-slate-500">
                Pusat kendali informasi demografi, spasial, dan risiko seluruh dusun.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm border border-blue-100">
              <Info size={18} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-blue-700 uppercase tracking-widest">Petunjuk Navigasi</p>
              <p className="text-sm font-medium text-blue-600/80 leading-relaxed">
                Pilih salah satu dusun pada tabel di bawah untuk memperbarui deskripsi publik, 
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center gap-2 px-4">
          <Map size={18} className="text-slate-400" />
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest">Daftar Wilayah Aktif</h2>
        </div>  
        <ListProfile />
      </section>

      <footer className="text-center py-4">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.3em]">
          Sistem Informasi Desa Sriharjo &copy; 2026
        </p>
      </footer>
    </div>
  );
}