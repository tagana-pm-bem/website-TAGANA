"use client";

import Image from "next/image";
import React from "react";

export function AuthHero() {
  return (
    <div className="hidden lg:flex lg:w-full h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <Image
          src="/pengkol.png"
          alt="Desa Background"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col justify-end p-12 text-white w-full">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          "Membangun Desa,<br />
          Memajukan Bangsa"
        </h1>
        <p className="text-lg text-gray-200 ">
          Sistem informasi manajemen terpadu untuk administrasi desa <br /> yang lebih efisien, transparan, dan modern.
        </p>
      </div>
    </div>
  );
}
