"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import MobileCalendar from "./calendar";
import EventList from "./EventList";

interface AgendaProps {
  refreshTrigger?: number;
}

export default function Agenda({ refreshTrigger }: AgendaProps) {
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const getTitle = () => {
    if (filterDate) {
      const dateObj = new Date(filterDate);
      return `Acara Tanggal ${dateObj.toLocaleDateString("id-ID", { day: 'numeric', month: 'long' })}`;
    }
    return "Acara Mendatang";
  };

  return (
    <Card className="w-full flex-col gap-8 flex">
      <h1 className="text-md font-bold text-gray-800">Kalender Kegiatan</h1>
      
      <MobileCalendar onSelectDate={setFilterDate} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
             <h1 className="text-md font-bold text-gray-800">{getTitle()}</h1>
             {filterDate && (
                 <button 
                    onClick={() => setFilterDate(null)} 
                    className="text-xs text-blue-500 hover:underline"
                 >
                    Reset Filter
                 </button>
             )}
        </div>

        <EventList refreshTrigger={refreshTrigger} filterDate={filterDate} />
      </div>
    </Card>
  );
}