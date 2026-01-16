"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus, Save, Loader2, User, Key, Mail, Info } from "lucide-react";
import { authService } from "../../../auth/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function PengaturanAkun({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", username: "", password: "" });

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.username || !formData.password) {
      toast.error("Data Tidak Lengkap", { description: "Mohon lengkapi seluruh kolom formulir." });
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password Terlalu Pendek", { description: "Password minimal harus 6 karakter." });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Mendaftarkan admin baru...");
    try {
      await authService.registerAdmin({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
      });

      toast.success("Admin Berhasil Terdaftar", {
        id: toastId,
        description: `Akun @${formData.username} kini aktif di sistem.`
      });
      
      setFormData({ fullName: "", username: "", password: "" });
      onSuccess();
    } catch (error: any) {
      toast.error("Gagal Mendaftar", {
        id: toastId,
        description: error.message || "Kesalahan server saat memproses akun."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-[1.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-600">
            <UserPlus size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900">Tambah Admin Baru</CardTitle>
            <CardDescription className="font-medium text-slate-500">Berikan akses manajemen sistem kepada personel terpercaya.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 group">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-blue-700 leading-relaxed">
            Sistem akan secara otomatis menyertakan email institusi 
            <span className="font-bold underline ml-1">@sriharjo.com</span> 
            untuk kredensial login admin ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <User size={14} className="text-[#044BB1]" /> Nama Lengkap
            </Label>
            <Input 
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Contoh: Budi Santoso" 
              className="rounded-xl border-slate-200 h-11 shadow-sm" 
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <Mail size={14} className="text-[#044BB1]" /> Username
            </Label>
            <div className="relative">
              <Input 
                value={formData.username} 
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="budi" 
                className="rounded-xl border-slate-200 h-11 shadow-sm pr-28" 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                @sriharjo.com
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="font-bold text-slate-700 flex items-center gap-2 mb-1">
              <Key size={14} className="text-[#044BB1]" /> Kata Sandi
            </Label>
            <Input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Minimal 6 karakter kombinasi" 
              className="rounded-xl border-slate-200 h-11 shadow-sm" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-50">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#044BB1] hover:bg-blue-700 px-8 py-6 rounded-2xl font-bold shadow-lg shadow-blue-900/10 gap-2 active:scale-95 transition-all"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isLoading ? "Menyimpan..." : "Daftarkan Admin"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}