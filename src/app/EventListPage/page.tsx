"use client";

import { useState } from "react";
import MobileCalendar from "./components/calendar";
import { EventList } from "./components/Eventlist";
import { Header } from "./components/Header";
import { useRouter } from "next/navigation";

export default function EventListPage() {
  const router = useRouter();
  
  const [filterDate, setFilterDate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Header 
         title="Agenda Desa" 
         subtitle="Jadwal kegiatan dan acara Desa Sriharjo"
         onBack={() => router.push("/peta-page")} 
      />
      
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <MobileCalendar onSelectDate={setFilterDate} />

        <div className="w-full p-4 md:p-8 rounded-2xl shadow-xl bg-white mt-8 mb-4 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
             <div className="inline-block px-6 py-2 rounded-lg bg-blue-50 border border-blue-100">
               <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                 {filterDate ? `Agenda Tanggal ${new Date(filterDate).toLocaleDateString('id-ID')}` : "Agenda Mendatang"}
               </h1>
             </div>
             
             {filterDate && (
               <button 
                 onClick={() => setFilterDate(null)}
                 className="text-sm text-blue-600 hover:underline font-medium"
               >
                 Reset Filter
               </button>
             )}
          </div>
          
          <EventList filterDate={filterDate} />
        </div>
      </div>
    </div>
  );
}