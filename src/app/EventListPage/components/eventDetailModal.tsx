"use client";

import { X, Clock, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

interface EventUI {
  id: number;
  bulan: string;
  tanggal: number;
  judul: string;
  deskripsi: string;
  startTime: string;
  endTime: string;
  lokasi: string;
  image: string;
}

interface EventDetailModalProps {
  event: EventUI;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] relative">
        
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-all"
        >
          <X size={20} />
        </button>

        <div className="relative w-full h-56 sm:h-64 bg-gray-200 flex-shrink-0">
          <Image 
            src={event.image || "/images/placeholder-news.jpg"} 
            alt={event.judul} 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                Event Desa
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
              {event.judul}
            </h2>
          </div>

          <div className="grid gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Tanggal</p>
                <p className="text-sm font-medium text-gray-900">
                  {event.tanggal} {event.bulan} (Tahun ini)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Waktu</p>
                <p className="text-sm font-medium text-gray-900">
                  {event.startTime} - {event.endTime} WIB
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Lokasi</p>
                <p className="text-sm font-medium text-gray-900 leading-snug">
                  {event.lokasi}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase border-b pb-2">
              Deskripsi Kegiatan
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {event.deskripsi}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors text-sm"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}