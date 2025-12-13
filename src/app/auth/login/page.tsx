"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutDashboard, Loader2, AlertCircle } from "lucide-react";
import { authService } from "../services/authService"; 

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await authService.login({ username, password });

      router.push("/admin/dashboard");
      router.refresh(); 
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setErrorMsg("Username atau Kata Sandi salah!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 flex items-start justify-center flex-col p-16 gap-5">
      <div className="flex flex-row gap-5 items-center">
        <div className="h-13 w-13 rounded-xl bg-blue-500 flex items-center justify-center">
          <LayoutDashboard size={30} color="white" />
        </div>
        <p className="font-bold text-2xl text-blue-500">Admin Dashboard</p>
      </div>

      <div className="h-full w-full mt-5 flex flex-col gap-3 items-start justify-center">
        <h1 className="text-3xl font-bold text-black ">Selamat Datang Kembali</h1>
        <p className="text-lg text-gray-400">Silahkan masuk akun admin anda untuk melanjutkan</p>
      </div>

      {/* TAMPILKAN ERROR JIKA ADA */}
      {errorMsg && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* INPUT USERNAME */}
      <div className="flex flex-col gap-3 items-start w-full">
        <label className="text-sm font-semibold text-gray-700 ">Username</label>
        <input 
          type="text"  
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Masukan username (contoh: admin)" 
          className="w-full rounded-xl border-2 border-gray-400 py-2 px-3 placeholder:text-black/20 placeholder:text-sm text-black focus:border-blue-500 focus:outline-none transition-all"
        />
      </div>

      {/* INPUT PASSWORD */}
      <div className="flex flex-col gap-3 items-start w-full">
        <label className="text-sm font-semibold text-gray-700 ">Kata Sandi</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukan kata sandi ......" 
          className="w-full rounded-xl border-2 border-gray-400 py-2 px-3 placeholder:text-black/20 placeholder:text-sm text-black focus:border-blue-500 focus:outline-none transition-all"
        />
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
            <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">Ingat Aku</label>
          </div>
          <button type="button" className="text-sm text-blue-500 hover:underline">Lupa Kata Sandi?</button>
        </div>

        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Memproses...
            </>
          ) : (
            <>
              Masuk ke Dashboard
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>

      <div className="w-full items-center mt-4">
        <p className="text-gray-500 text-sm text-center">@2024 Pemerintah Desa. All rights reserved</p>
      </div>
    </div>
  );
}