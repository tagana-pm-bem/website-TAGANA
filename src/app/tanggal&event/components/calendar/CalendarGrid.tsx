// components/calendar/CalendarGrid.tsx
"use client";

interface CalendarGridProps {
  dayNames: string[];
  calendarDays: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }[];
  renderDayCell: (data: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => React.ReactNode;
}

export default function CalendarGrid({
  dayNames,
  calendarDays,
  renderDayCell,
}: CalendarGridProps) {
  return (
    <div className="w-full mt-4">
      {/* Header hari */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day, i) => (
          <div key={i} className="text-center py-2 font-bold text-gray-600 text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Grid tanggal */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((item, i) => (
          <div key={i}>
            {renderDayCell(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
