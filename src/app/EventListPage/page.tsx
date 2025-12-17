"use client";

import { useState, useEffect } from "react";
import MobileCalendar from "./components/calendar";
import { EventList } from "./components/Eventlist"; 
import { Header } from "./components/Header";
import { useRouter } from "next/navigation";
import { eventService, EventDB } from "@/services/eventService";

export default function EventListPage() {
  const router = useRouter();
  
  const [filterDate, setFilterDate] = useState<string | null>(null);
  
  const [allEvents, setAllEvents] = useState<EventDB[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setAllEvents(data);
      } catch (error) {
        console.error("Gagal mengambil marker event:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Header 
         title="Agenda Desa" 
         subtitle="Jadwal kegiatan dan acara Desa Sriharjo"
         onBack={() => router.push("/peta-page")} 
      />
      
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <MobileCalendar 
          onSelectDate={setFilterDate} 
          events={allEvents} 
        />

        
          {/* keterangan mark */}
          <div className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white mt-4 mb-4 border border-blue-100 ">
            <div className="flex-1">
              <span className="text-lg font-semibold text-gray-700">Keterangan Mark Kalender</span>
            </div>

            <div className="flex flex-row items-center mt-3">
            <span className="inline-block w-6 h-6 border-3 border-orange-500 bg-white rounded-sm mr-2"></span>
            <span className="text-lg text-gray-600"> Event kegiatan  </span>

            </div>
          </div>

        <div className="w-full p-4 md:p-8 rounded-2xl shadow-xl bg-white mt-6 mb-4 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
             <div className="inline-block px-6 py-2 rounded-lg bg-white border border-gray-300 shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.35)] ">
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