'use client';

import Image from "next/image";
import React from "react";
// Import helper dari file image.ts kamu
import { getDusunImageByName, defaultDusunImage } from "@/data/image";

interface Props {
  dusunName: string;
  description: string;
  imageUrl: string | null; 
  imageAlt?: string; 
  population: number;
}

export default function PhotoAndDescription({
  dusunName,
  description,
  imageUrl,
  imageAlt,
  population,
}: Props) {
  
  /**
   * LOGIKA PEMILIHAN GAMBAR:
   * 1. Cek apakah ada imageUrl dari props (Database).
   * 2. Jika tidak ada, cari di file lokal image.ts berdasarkan nama dusun.
   * 3. Jika masih tidak ada, gunakan default fallback image.
   */
  const localImage = getDusunImageByName(dusunName);
  const finalImageSrc = imageUrl && imageUrl.length > 5 ? imageUrl : localImage;
  const finalAltText = imageAlt || `Pemandangan Dusun ${dusunName}`;

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Main Image Hero Section */}
        <div className="relative w-full h-80 sm:h-100 lg:h-[700px] rounded-xl overflow-hidden shadow-2xl mb-10 group border border-slate-100">
          <Image
            src={finalImageSrc}
            alt={finalAltText}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultDusunImage.imagePath;
            }}
            priority
            unoptimized 
          />
          
          {/* Overlay Gradient yang lebih estetik */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-sm">
                {dusunName}
              </h2>
            </div>
            <div className="flex items-center gap-3">
               <span className="h-[2px] w-8 bg-blue-500 rounded-full"></span>
               <p className="text-white/90 text-sm sm:text-lg font-medium tracking-wide">
                Populasi <span className="text-blue-400 font-bold">{population.toLocaleString('id-ID')}</span> Jiwa tercatat
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full">
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-8 sm:p-10 shadow-sm border border-gray-300 relative overflow-hidden">
            {/* Soft Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                <div className="bg-[#044BB1] rounded-2xl p-4 shrink-0 shadow-lg shadow-blue-900/20 self-start">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-slate-900 text-2xl tracking-tight">
                      Mengenal Wilayah
                    </h3>
                    <div className="h-1 flex-1 bg-gradient-to-r from-blue-100 to-transparent rounded-full" />
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-base sm:text-lg text-justify font-medium">
                    {description || "Informasi mendetail mengenai profil dan karakteristik dusun ini sedang dalam proses pembaruan oleh pemerintah desa. Silakan kembali lagi nanti untuk informasi lengkap."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}