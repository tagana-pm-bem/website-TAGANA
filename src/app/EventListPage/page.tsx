"use client";

import { useState, useEffect } from "react";
import MobileCalendar from "./components/calendar";
import { EventList } from "./components/Eventlist";
import { Header } from "./components/Header";
import { useRouter } from "next/navigation";
import { eventService, EventDB } from "@/services/eventService";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export default function EventListPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const [allEvents, setAllEvents] = useState<EventDB[]>([]);
  const [showKeterangan, setShowKeterangan] = useState(false);

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
        <MobileCalendar onSelectDate={setFilterDate} events={allEvents} />

        {/* tombol detail penanda */}
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm mt-6 mb-6 overflow-hidden">
          <div
            className="flex justify-between items-center p-4 cursor-pointer md:cursor-default bg-gray-50/50 md:bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              <h3 className="text-sm md:text-base font-semibold text-gray-800">
                Keterangan Penanda
              </h3>
            </div>

            <button className="md:hidden text-gray-500 transition-colors hover:text-blue-600">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div
            className={`px-4 pb-4 md:pt-0 transition-all duration-300 ease-in-out ${
              isOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 md:border-t md:border-gray-100 md:pt-4">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 w-5 h-5 flex-shrink-0 border-2 border-orange-500 bg-white rounded-[4px] shadow-sm"></div>
                <p className="text-sm text-gray-600 leading-snug">
                  <span className="font-semibold text-gray-900">
                    Event Kegiatan
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Ditandai kotak oranye.
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 w-5 h-5 flex-shrink-0 border-2 border-blue-400 bg-blue-100 rounded-[4px] shadow-sm"></div>
                <p className="text-sm text-gray-600 leading-snug">
                  <span className="font-semibold text-gray-900">Hari Ini</span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Ditandai blok biru muda.
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 w-5 h-5 flex-shrink-0 border border-gray-300 bg-white rounded-[4px] shadow-sm"></div>
                <p className="text-sm text-gray-600 leading-snug">
                  <span className="font-semibold text-gray-900">
                    Tanggal Biasa
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Tanpa penanda khusus.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 md:p-8 rounded-2xl shadow-xl bg-white mt-6 mb-4 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
            <div className="inline-block px-6 py-2 rounded-lg bg-white border border-gray-300 shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.35)] ">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {filterDate
                  ? `Agenda Tanggal ${new Date(filterDate).toLocaleDateString(
                      "id-ID"
                    )}`
                  : "Agenda Mendatang"}
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
