"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react"; // Pastikan sudah install lucide-react (bawaan shadcn)
// import { Button } from "@/components/ui/button"; // Opsional: jika ingin pakai button shadcn

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

export function Header({ 
  title = "Event", 
  subtitle = "Informasi event desa sriharjo", 
  onBack 
}: HeaderProps) {
  return (
    <header className="relative  overflow-hidden bg-linear-to-br from-[#044BB1] via-[#0566d6] to-[#0a84ff] text-white">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-ful mx-auto">
          
          {/* Section Teks dengan Animasi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-sm">
              {title}
            </h1>
            <p className="text-blue-100 text-sm md:text-lg max-w-2xl font-medium opacity-90 leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Tombol Kembali dengan Animasi & Hover State */}
          {onBack && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <button
                onClick={onBack}
                className="group flex items-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-900/20 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-semibold text-sm">Kembali</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Border bawah halus */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </header>
  );
}