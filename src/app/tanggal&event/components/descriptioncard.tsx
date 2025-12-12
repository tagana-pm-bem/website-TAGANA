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

interface DescriptionCardProps {
  event: Event;
  onClick: () => void;
}

export default function DescriptionCard({ event, onClick }: DescriptionCardProps) {
  const categoryColors = {
    siaga: "from-red-500 to-red-600",
    kegiatan: "from-blue-500 to-blue-600",
    pelatihan: "from-green-500 to-green-600",
    sosialisasi: "from-yellow-500 to-yellow-600",
  };

  const categoryIcons = {
    siaga: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    kegiatan: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    pelatihan: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    sosialisasi: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };

  const statusColors = {
    upcoming: "text-blue-600 bg-blue-100",
    ongoing: "text-green-600 bg-green-100",
    completed: "text-gray-600 bg-gray-100",
  };

  const statusText = {
    upcoming: "Akan Datang",
    ongoing: "Berlangsung",
    completed: "Selesai",
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-gray-100 hover:border-[#044BB1]"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${categoryColors[event.category]} p-4 flex items-center gap-3`}>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-white">{categoryIcons[event.category]}</div>
        </div>
        <div className="flex-1">
          <span className="inline-block px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold text-white">
            {event.category.toUpperCase()}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">{event.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold">{event.date}</span>
          <span className="text-gray-400">•</span>
          <span className="font-semibold">{event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <svg className="w-5 h-5 text-[#044BB1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium line-clamp-2">{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{event.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[event.status]}`}>
            {statusText[event.status]}
          </span>
          {event.participants && (
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-semibold">{event.participants}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="h-1 bg-gradient-to-r from-[#044BB1] to-[#0566d6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
}