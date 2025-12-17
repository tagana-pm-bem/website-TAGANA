"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { UserPlus, Save, Loader2, User, Key, Mail } from "lucide-react";
import { authService } from "../../../auth/services/authService";

// 1. Import Hook SweetAlert
import { useSweetAlert } from "@/components/ui/SweetAlertProvider";

interface PengaturanAkunProps {
  onSuccess: () => void; 
}

export default function PengaturanAkun({ onSuccess }: PengaturanAkunProps) {
  // 2. Panggil fungsi SweetAlert
  const { showDraggableSuccess, showDraggableError } = useSweetAlert();

  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // 3. Validasi dengan SweetAlert Error
    if (!formData.fullName || !formData.username || !formData.password) {
      showDraggableError("Data Tidak Lengkap", "Mohon lengkapi nama, username, dan password.");
      return;
    }
    if (formData.password.length < 6) {
      showDraggableError("Password Lemah", "Password minimal harus 6 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.registerAdmin({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
      });

      // 4. Notifikasi Sukses dengan SweetAlert
      await showDraggableSuccess(`Admin ${formData.username} Berhasil Ditambahkan!`);
      
      setFormData({ fullName: "", username: "", password: "" });
      onSuccess();
    } catch (error: any) {
      console.error(error);
      // 5. Notifikasi Gagal dengan SweetAlert
      showDraggableError("Gagal Menambahkan", error.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col gap-8 w-full ">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <UserPlus size={20} className="text-blue-500" />
          <h1 className="text-md font-semibold text-gray-800">Tambah Admin Baru</h1>
        </div>

        <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
          User yang didaftarkan di sini akan memiliki email otomatis: 
          <span className="font-bold text-blue-600"> [username]@sriharjo.com</span>. 
          Gunakan username dan password tersebut untuk login.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-blue-500 text-sm font-semibold flex items-center gap-2">
              <User size={14} /> Nama Lengkap
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-blue-500 text-sm font-semibold flex items-center gap-2">
              <Mail size={14} /> Username
            </label>
            <div className="relative">
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Contoh: budi"
                className="w-full border border-gray-300 rounded-xl pl-4 pr-32 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="absolute right-4 top-2.5 text-sm text-gray-400 font-medium select-none">
                @sriharjo.com
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-blue-500 text-sm font-semibold flex items-center gap-2">
              <Key size={14} /> Kata Sandi
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter..."
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          <span className="text-sm font-semibold">
            {isLoading ? "Menyimpan..." : "Simpan Admin"}
          </span>
        </button>
      </div>
    </Card>
  );
}