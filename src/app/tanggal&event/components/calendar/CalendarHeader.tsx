// components/calendar/CalendarHeader.tsx
"use client";

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNext}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 ml-4">
          {monthNames[month]} {year}
        </h2>
      </div>

      <button
        onClick={onToday}
        className="px-4 py-2 bg-[#044BB1] text-white font-semibold rounded-lg hover:bg-[#033a8f] transition-all duration-300"
      >
        Hari Ini
      </button>
    </div>
  );
}
