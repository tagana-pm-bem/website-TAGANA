"use client";

import { BackButton } from "@/components/ui/back-button";
import React from "react";

interface Props {
  dusunName: string;
  population: number;
}

export default function Header({ dusunName, population }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white shadow-lg relative overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white transform rotate-45"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
      </div>

      {/* Animated Dots Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(48)].map((_, i) => (
            <div key={i} className="bg-white rounded-full w-2 h-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BackButton href="/peta-page" label="Kembali ke Peta" />
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-30 rounded-lg p-3 ">
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="blue" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{dusunName}</h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Detail Informasi Lengkap Dusun</p>
          </div>
        </div>
      </div>
    </div>
  );
}
