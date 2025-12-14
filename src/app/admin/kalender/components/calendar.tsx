"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCalendarProps {
  onSelectDate: (date: string | null) => void;
}

export default function MobileCalendar({ onSelectDate }: MobileCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedMonth = String(month + 1).padStart(2, '0');
    const clickedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${clickedMonth}-${clickedDay}`;

    if (selectedDateStr === dateStr) {
      setSelectedDateStr(null);
      onSelectDate(null);
    } else {
      setSelectedDateStr(dateStr);
      onSelectDate(dateStr);
    }
  };

  const calendar = [];
  for (let i = 0; i < firstDay; i++) calendar.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendar.push(i);

  return (
    <div className="w-full p-4 rounded-xl shadow-md bg-white border border-gray-100">
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
          <ChevronLeft size={20} />
        </button>

        <h2 className="font-bold text-gray-800 text-lg">
          {monthNames[month]} {year}
        </h2>

        <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-400 font-semibold mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {calendar.map((day, i) => {
          // Cek apakah hari ini
          const isToday =
            day &&
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            day &&
            selectedDateStr === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          return (
            <div
              key={i}
              onClick={() => day && handleDateClick(day)}
              className={`
                h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all
                ${day ? "cursor-pointer hover:bg-blue-50 hover:text-blue-600" : "pointer-events-none"}
                ${isToday && !isSelected ? "bg-gray-100 text-gray-900 border border-gray-300" : ""}
                ${isSelected ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" : "text-gray-700"}
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