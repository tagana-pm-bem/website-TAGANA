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

interface TanggalCardProps {
  day: number;
  events: Event[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export default function TanggalCard({ day, events, isToday, isCurrentMonth, onClick }: TanggalCardProps) {
  const hasEvents = events.length > 0;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-2 rounded-lg border-2 transition-all duration-300 min-h-[80px]
        ${isToday ? "border-[#044BB1] bg-blue-50 shadow-lg" : "border-gray-200 hover:border-blue-300"}
        ${!isCurrentMonth ? "opacity-40" : ""}
        ${hasEvents ? "hover:shadow-md hover:scale-105" : "hover:bg-gray-50"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Day Number */}
        <div className={`
          text-sm font-bold mb-1
          ${isToday ? "text-[#044BB1]" : isCurrentMonth ? "text-gray-900" : "text-gray-400"}
        `}>
          {day}
        </div>

        {/* Event Indicators */}
        {hasEvents && (
          <div className="flex-1 space-y-1">
            {events.slice(0, 2).map((event, index) => {
              const categoryColors = {
                siaga: "bg-red-500",
                kegiatan: "bg-blue-500",
                pelatihan: "bg-green-500",
                sosialisasi: "bg-yellow-500",
              };

              return (
                <div
                  key={index}
                  className={`w-full h-1.5 ${categoryColors[event.category]} rounded-full`}
                  title={event.title}
                ></div>
              );
            })}
            {events.length > 2 && (
              <p className="text-[10px] text-gray-600 font-semibold text-center">
                +{events.length - 2} lagi
              </p>
            )}
          </div>
        )}

        {/* Today Badge */}
        {isToday && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#044BB1] rounded-full animate-pulse"></div>
        )}
      </div>
    </button>
  );
}