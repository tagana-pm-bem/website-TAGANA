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
      className="bg-white shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-4 flex flex-row gap-3 items-center border border-gray-100 hover:border-blue-300 "
    >
      {/* Date Badge */}
      <div className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-2xs flex-shrink-0 ">
        <span className="text-xs font-semibold text-blue-100 uppercase tracking-wide">
          {event.bulan}
        </span>
        <span className="text-2xl font-bold text-white">{event.tanggal}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <h2 className="font-bold text-lg text-gray-800 truncate group-hover:text-blue-600 transition-colors">
          {event.judul}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-1">{event.deskripsi}</p>

        {/* Info Row */}
        <div className="flex flex-wrap gap-2 mt-1">
          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
            <Clock size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-blue-600">
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
            <MapPin size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-blue-600">
              {event.lokasi}
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 group-hover:border-blue-300 transition-all">
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
