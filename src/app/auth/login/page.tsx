"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { authService } from "../services/authService";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMsg("Username dan Password harus diisi!");
      return;
    }

    if (username.length < 3) {
      setErrorMsg("Username minimal 3 karakter!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password minimal 6 karakter!");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const result = await authService.login({ username, password });

      console.log("[Login] ✅ Berhasil login, user:", result.user?.email);
      console.log("[Login] Redirecting ke dashboard...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("[Login] ❌ Error:", error.message);
      setErrorMsg("Username atau Kata Sandi salah!");
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full flex bg-white rounded-3xl items-start justify-center flex-col p-6 md:p-16 gap-4 md:gap-5">
      <div className="flex flex-row gap-3 md:gap-5 items-center">
        <div className="h-10 w-10 md:h-13 md:w-13 rounded-xl bg-blue-500 flex items-center justify-center">
          <LayoutDashboard
            size={24}
            className="md:w-[30px] md:h-[30px]"
            color="white"
          />
        </div>
        <p className="font-bold text-xl md:text-2xl text-blue-500">
          Admin Dashboard
        </p>
      </div>

      <div className="h-full w-full mt-3 md:mt-5 flex flex-col gap-2 md:gap-3 items-start justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Selamat Datang Kembali
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Silahkan masuk akun admin anda untuk melanjutkan
        </p>
      </div>

      {/* TAMPILKAN ERROR JIKA ADA */}
      {errorMsg && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 px-3 md:px-4 py-2.5 md:py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <AlertCircle
            size={16}
            className="md:w-[18px] md:h-[18px] flex-shrink-0"
          />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* FORM LOGIN */}
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 md:gap-5">
        {/* INPUT USERNAME */}
        <div className="flex flex-col gap-2 md:gap-3 items-start w-full">
          <label className="text-xs md:text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukan username (contoh: admin)"
            className="w-full rounded-xl border-2 border-gray-400 py-2.5 md:py-2 px-3 placeholder:text-black/20 placeholder:text-xs md:placeholder:text-sm text-sm md:text-base text-black focus:border-blue-500 focus:outline-none transition-all bg-white"
            autoComplete="username"
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="flex flex-col gap-2 md:gap-3 items-start w-full">
          <label className="text-xs md:text-sm font-semibold text-gray-700">
            Kata Sandi
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan kata sandi ......"
              className="w-full rounded-xl border-2 border-gray-400 py-2.5 md:py-2 px-3 pr-12 placeholder:text-black/20 placeholder:text-xs md:placeholder:text-sm text-sm md:text-base text-black focus:border-blue-500 focus:outline-none transition-all bg-white"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff size={18} className="md:w-5 md:h-5" />
              ) : (
                <Eye size={18} className="md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full -mt-2">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="rememberMe"
                className="text-xs md:text-sm text-gray-700 cursor-pointer"
              >
                Ingat Aku
              </label>
            </div>
            <button
              type="button"
              className="text-xs md:text-sm text-blue-500 hover:underline"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2.5 md:py-3 px-4 rounded-xl font-semibold text-sm md:text-base mt-2 md:mt-4 flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="w-full items-center mt-2 md:mt-4">
        <p className="text-gray-500 text-xs md:text-sm text-center">
          @2024 Pemerintah Desa. All rights reserved
        </p>
      </div>

      {/* TOMBOL BACK - Hanya muncul di Mobile */}
      <button
        onClick={handleBack}
        className="lg:hidden fixed bottom-6 right-6 bg-white text-blue-500 p-3 rounded-full shadow-lg border-2 border-blue-500 hover:bg-blue-50 transition-all z-50 flex items-center justify-center"
        aria-label="Kembali"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
  );
}
