"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      router.push("/admin/dashboard");
      setIsLoading(false);
    }, 800);
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

      <div className="flex flex-col gap-3 items-start w-full">
        <label className="text-sm font-semibold text-gray-700 ">Email atau Username</label>
        <input 
        type="email" 
        placeholder="Masukan email ......" 
        className="w-full rounded-xl border-2 border-gray-400 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-3 items-start w-full">
        <label className="text-sm font-semibold text-gray-700 ">Kata Sandi</label>
        <input 
        type="Password" 
        placeholder="Masukan email ......" 
        className="w-full rounded-xl border-2 border-gray-400 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-400"
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
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="rememberMe" className="text-sm text-gray-700">Ingat Aku</label>
          </div>
          <button className="text-sm text-blue-500 hover:underline">Lupa Kata Sandi?</button>
        </div>
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
        >
          Masuk ke Dashboard
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="w-full items-center">
        <p className="text-gray-500 text-sm text-center">@2024 Pemerintah Desa. All rights reserved</p>
      </div>
    </div>
  );
}
