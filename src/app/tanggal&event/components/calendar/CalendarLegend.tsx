// components/calendar/CalendarLegend.tsx
"use client";

export default function CalendarLegend() {
  const legends = [
    { label: "Siaga", color: "bg-red-500" },
    { label: "Kegiatan", color: "bg-blue-500" },
    { label: "Pelatihan", color: "bg-green-500" },
    { label: "Sosialisasi", color: "bg-yellow-500" },
  ];

  return (
    <div className="mt-6 pt-6 border-t">
      <p className="text-sm font-bold text-gray-700 mb-3">Kategori Event:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {legends.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${item.color} rounded`}></div>
            <span className="text-xs font-semibold text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
