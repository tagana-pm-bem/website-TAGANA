'use client';

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: {
    id?: number;
    bulan: string;
    tanggal: number;
    judul: string;
    deskripsi: string;
    startTime: string;
    endTime: string;
    lokasi: string;
    image: string;
  };
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      onClick={onClick}
      // Layout selalu flex-row (menyamping)
      className="group bg-white shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-3 sm:p-4 flex flex-row gap-3 sm:gap-4 items-center border border-gray-100 hover:border-blue-300 transition-all cursor-pointer"
    >
      
      {/* Date Badge: Ukuran mengecil di mobile (w-12) vs desktop (w-16) */}
      <div className="flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm flex-shrink-0">
        <span className="text-[10px] sm:text-xs font-semibold text-blue-100 uppercase tracking-wide">
          {event.bulan}
        </span>
        <span className="text-lg sm:text-2xl font-bold text-white leading-none">
          {event.tanggal}
        </span>
      </div>

      {/* Content: Mengisi sisa ruang di tengah */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Judul: Font lebih kecil di mobile */}
        <h2 className="font-bold text-sm sm:text-lg text-gray-800 truncate group-hover:text-blue-600 transition-colors">
          {event.judul}
        </h2>
        
        <p className="text-xs text-gray-500 line-clamp-1">
          {event.deskripsi}
        </p>

        {/* Info Row */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
          {/* Waktu */}
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 max-w-full">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
            <span className="text-[10px] sm:text-xs font-medium text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
              {event.startTime}
            </span>
          </div>
          
          {/* Lokasi */}
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 max-w-full">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
            {/* Truncate lokasi agar tidak menabrak gambar di layar kecil */}
            <span className="text-[10px] sm:text-xs font-medium text-blue-600 truncate max-w-[60px] sm:max-w-[120px]">
              {event.lokasi}
            </span>
          </div>
        </div>
      </div>

      {/* Image: Selalu di kanan, ukuran menyesuaikan (64px di mobile, 80px di desktop) */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 group-hover:border-blue-300 transition-all">
        <Image
          src={event.image || "/default.jpg"}
          alt={event.judul}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  );
}