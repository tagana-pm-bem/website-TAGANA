"use client";

import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "siaga" | "kegiatan" | "pelatihan" | "sosialisasi";
  description: string;
  participants?: number;
  status: "upcoming" | "ongoing" | "completed";
}

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function PopUp({ isOpen, onClose, event }: PopUpProps) {
  if (!isOpen || !event) return null;

  const categoryColors = {
    siaga: "bg-red-100 text-red-700 border-red-300",
    kegiatan: "bg-blue-100 text-blue-700 border-blue-300",
    pelatihan: "bg-green-100 text-green-700 border-green-300",
    sosialisasi: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  const statusColors = {
    upcoming: "bg-blue-500",
    ongoing: "bg-green-500",
    completed: "bg-gray-500",
  };

  const statusText = {
    upcoming: "Akan Datang",
    ongoing: "Sedang Berlangsung",
    completed: "Selesai",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#044BB1] to-[#0566d6] p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[event.category]}`}>
                {event.category.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{event.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2 h-2 rounded-full ${statusColors[event.status]}`}></span>
                <span className="text-sm text-white/90">{statusText[event.status]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Tanggal</p>
                <p className="text-sm font-bold text-gray-900">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Waktu</p>
                <p className="text-sm font-bold text-gray-900">{event.time}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold">Lokasi</p>
              <p className="text-sm font-bold text-gray-900">{event.location}</p>
            </div>
          </div>

          {/* Participants */}
          {event.participants && (
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Peserta</p>
                <p className="text-sm font-bold text-gray-900">{event.participants} Orang</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Deskripsi
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
              {event.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl border-t">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}