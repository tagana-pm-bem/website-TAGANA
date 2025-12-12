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

interface DateEventsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function DateEventsPopup({ isOpen, onClose, date, events, onEventClick }: DateEventsPopupProps) {
  if (!isOpen || !date) return null;

  const categoryColors = {
    siaga: "from-red-500 to-red-600",
    kegiatan: "from-blue-500 to-blue-600",
    pelatihan: "from-green-500 to-green-600",
    sosialisasi: "from-yellow-500 to-yellow-600",
  };

  const categoryBadgeColors = {
    siaga: "bg-red-100 text-red-700 border-red-300",
    kegiatan: "bg-blue-100 text-blue-700 border-blue-300",
    pelatihan: "bg-green-100 text-green-700 border-green-300",
    sosialisasi: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  const formattedDate = date.toLocaleDateString('id-ID', { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#044BB1] to-[#0566d6] p-6 rounded-t-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
              <p className="text-white/90 mt-1 text-sm">
                {events.length > 0 ? `${events.length} Event Tersedia` : 'Tidak ada event'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    onEventClick(event);
                    onClose();
                  }}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-gray-100 hover:border-[#044BB1]"
                >
                  {/* Event Header */}
                  <div className={`bg-gradient-to-r ${categoryColors[event.category]} p-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold border ${categoryBadgeColors[event.category]}`}>
                          {event.category.toUpperCase()}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">{event.title}</h3>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Event Details */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-[#044BB1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium line-clamp-1">{event.location}</span>
                    </div>

                    {event.participants && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-semibold">{event.participants} Peserta</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed pt-2 border-t">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Event</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Belum ada kegiatan yang dijadwalkan pada tanggal ini. Pantau terus untuk informasi event terbaru dari TAGANA Sriharjo.
              </p>
            </div>
          )}
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
