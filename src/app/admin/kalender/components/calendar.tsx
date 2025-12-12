"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MobileCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Current month data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Today
  const today = new Date();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Build calendar
  const calendar = [];
  for (let i = 0; i < firstDay; i++) calendar.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendar.push(i);

  return (
    <div className="w-full p-4 rounded-xl shadow-md bg-white">
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <ChevronLeft size={20} />
        </button>

        <h2 className="font-semibold text-lg">
          {monthNames[month]} {year}
        </h2>

        <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {calendar.map((day, i) => {
          const isToday =
            day &&
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={i}
              className={`
                h-14 w-14 flex items-center justify-center rounded-lg text-sm
                ${day ? "cursor-pointer hover:bg-blue-100" : "text-transparent pointer-events-none"}
                ${isToday ? "border-2 border-blue-500 bg-blue-50 font-semibold text-blue-600" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
