"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { EventDB } from "@/services/eventService";

interface CalendarProps {
  onSelectDate: (date: string | null) => void;
  events?: EventDB[];
}

export default function Calendar({ onSelectDate, events = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Urutan hari dimulai dari Senin sesuai gambar
  const daysHeader = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Logika Kalender
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Min) - 6 (Sab)
  // Penyesuaian agar Senin jadi index 0
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleDateClick = (fullDate: string) => {
    if (selectedDateStr === fullDate) {
      setSelectedDateStr(null);
      onSelectDate(null);
    } else {
      setSelectedDateStr(fullDate);
      onSelectDate(fullDate);
    }
  };

  // Render Sel Hari
  const renderDays = () => {
    const totalSlots = 42; // 6 baris x 7 hari
    const slots = [];

    // 1. Hari dari bulan sebelumnya (warna abu-abu)
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      slots.push({ day: d, monthOffset: -1, isCurrentMonth: false });
    }

    // 2. Hari bulan sekarang
    for (let i = 1; i <= daysInMonth; i++) {
      slots.push({ day: i, monthOffset: 0, isCurrentMonth: true });
    }

    // 3. Hari bulan berikutnya
    const remainingSlots = totalSlots - slots.length;
    for (let i = 1; i <= remainingSlots; i++) {
      slots.push({ day: i, monthOffset: 1, isCurrentMonth: false });
    }

    return slots.map((item, index) => {
      const cellDate = new Date(year, month + item.monthOffset, item.day);
      const cellDateStr = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
      
      const isSelected = selectedDateStr === cellDateStr;
      const isToday = todayStr === cellDateStr;
      
      // Ambil semua event untuk tanggal ini
      const dayEvents = events.filter(e => e.event_date === cellDateStr);

      return (
        <div
          key={index}
          onClick={() => handleDateClick(cellDateStr)}
          className={`
            min-h-20 sm:min-h-27.5 p-2 border-r border-b border-blue-200  flex flex-col items-start transition-all cursor-pointer
            ${!item.isCurrentMonth ? "bg-gray-50/50 text-gray-300" : "bg-white text-gray-700 hover:bg-blue-50/30"}
            ${index % 7 === 0 ? "border-l" : ""}
          `}
        >
          {/* Angka Tanggal */}
          <div className="flex items-center justify-center mb-1">
            <span className={`
              text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
              ${isToday ? "bg-blue-600 text-white" : ""}
              ${isSelected && !isToday ? "bg-blue-100 text-blue-600" : ""}
            `}>
              {item.day}
            </span>
          </div>

          {/* List Judul Event */}
          <div className="w-full space-y-1 mt-1 overflow-hidden">
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-orange-400 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded shadow-sm truncate w-full font-medium"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* HEADER: Oktober 2023 | < Hari Ini > */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <CalendarIcon className="text-blue-600" size={20} />
          <h2 className="font-bold text-xl text-gray-800">
            {monthNames[month]} {year}
          </h2>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={prevMonth} 
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={goToToday}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hari Ini
          </button>
          <button 
            onClick={nextMonth} 
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* HEADER HARI (Sen - Min) */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/30">
        {daysHeader.map((d) => (
          <div key={d} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* GRID TANGGAL */}
      <div className="grid grid-cols-7 border-t border-gray-100">
        {renderDays()}
      </div>
    </div>
  );
}