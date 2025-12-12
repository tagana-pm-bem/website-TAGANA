"use client";

import React, { useState, useMemo } from "react";
import TanggalCard from "./components/tanggal card";
import DescriptionCard from "./components/descriptioncard";
import PopUp from "./components/popUP";
import DateEventsPopup from "./components/DateEventsPopup";
import CalendarHeader from "./components/calendar/CalendarHeader";
import CalendarGrid from "./components/calendar/CalendarGrid";
import CalendarLegend from "./components/calendar/CalendarLegend";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "siaga" | "kegiatan" | "pelatihan" | "sosialisasi";
  description: string;
  participants?: number;
  status: "upcoming" | "ongoing" | "completed";
}

// Sample data events
const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Siaga Banjir Dusun Tegalsari",
    date: "2025-01-15",
    time: "08:00 - 17:00 WIB",
    location: "Posko TAGANA Dusun Tegalsari",
    category: "siaga",
    description: "Pelaksanaan siaga banjir dengan pengawasan wilayah rawan banjir selama 24 jam. Tim TAGANA akan berkoordinasi dengan warga setempat.",
    participants: 15,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Pelatihan Pertolongan Pertama",
    date: "2025-01-20",
    time: "09:00 - 15:00 WIB",
    location: "Balai Desa Sriharjo",
    category: "pelatihan",
    description: "Pelatihan dasar pertolongan pertama pada kecelakaan (P3K) untuk anggota TAGANA dan relawan baru. Materi meliputi CPR, penanganan luka, dan evakuasi korban.",
    participants: 30,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Gotong Royong Pembersihan Saluran Air",
    date: "2025-01-22",
    time: "07:00 - 12:00 WIB",
    location: "Seluruh Dusun di Sriharjo",
    category: "kegiatan",
    description: "Kegiatan bersama warga untuk membersihkan saluran air dan selokan guna mencegah banjir di musim hujan.",
    participants: 150,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Sosialisasi Kesiapsiagaan Bencana",
    date: "2025-01-25",
    time: "13:00 - 16:00 WIB",
    location: "SD Negeri Sriharjo",
    category: "sosialisasi",
    description: "Sosialisasi kepada siswa SD tentang kesiapsiagaan menghadapi bencana alam, termasuk simulasi evakuasi dan cara menyelamatkan diri.",
    participants: 200,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Rapat Koordinasi Bulanan",
    date: "2025-01-28",
    time: "19:00 - 21:00 WIB",
    location: "Posko TAGANA Sriharjo",
    category: "kegiatan",
    description: "Rapat evaluasi kegiatan bulan ini dan perencanaan program bulan berikutnya. Wajib dihadiri oleh seluruh anggota TAGANA.",
    participants: 25,
    status: "upcoming",
  },
  {
    id: 6,
    title: "Pelatihan Manajemen Bencana",
    date: "2025-02-05",
    time: "08:00 - 16:00 WIB",
    location: "Balai Desa Sriharjo",
    category: "pelatihan",
    description: "Pelatihan manajemen tanggap darurat bencana termasuk koordinasi tim, logistik, dan komunikasi dalam situasi darurat.",
    participants: 40,
    status: "upcoming",
  },
];

export default function TanggalEventPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Get calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevLastDate - i),
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date: date,
        isCurrentMonth: true,
        isToday: isToday(date),
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    return days;
  }, [currentDate]);

  // Filter events by date
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (filterCategory === "all") return sampleEvents;
    return sampleEvents.filter(event => event.category === filterCategory);
  }, [filterCategory]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    const events = getEventsForDate(date);
    // Hanya buka popup jika ada event di tanggal tersebut
    if (events.length > 0) {
      setSelectedDate(date);
      setIsDatePopupOpen(true);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsPopUpOpen(true);
  };

  const renderDayCell = ({ date, isCurrentMonth, isToday: isTodayFlag }: { date: Date; isCurrentMonth: boolean; isToday: boolean }) => {
    const events = getEventsForDate(date);
    return (
      <TanggalCard
        day={date.getDate()}
        events={events}
        isToday={isTodayFlag}
        isCurrentMonth={isCurrentMonth}
        onClick={() => handleDateClick(date)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] py-8 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Kalender & Event TAGANA
              </h1>
              <p className="text-white/90 mt-1 text-sm md:text-base">
                Jadwal Kegiatan dan Event Kesiapsiagaan Bencana Sriharjo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <CalendarHeader
                month={currentDate.getMonth()}
                year={currentDate.getFullYear()}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
                onToday={handleToday}
              />

              <CalendarGrid
                dayNames={dayNames}
                calendarDays={calendarDays}
                renderDayCell={renderDayCell}
              />

              <CalendarLegend />
            </div>
          </div>

          {/* Events List Section */}
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Kategori</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    filterCategory === "all"
                      ? "bg-[#044BB1] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Semua Event
                </button>
                <button
                  onClick={() => setFilterCategory("siaga")}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    filterCategory === "siaga"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Siaga
                </button>
                <button
                  onClick={() => setFilterCategory("kegiatan")}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    filterCategory === "kegiatan"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Kegiatan
                </button>
                <button
                  onClick={() => setFilterCategory("pelatihan")}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    filterCategory === "pelatihan"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pelatihan
                </button>
                <button
                  onClick={() => setFilterCategory("sosialisasi")}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    filterCategory === "sosialisasi"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Sosialisasi
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Event Mendatang</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {filteredEvents.length} Event
                </span>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <DescriptionCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500">Tidak ada event untuk kategori ini</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PopUp Modal for Event Details */}
      <PopUp
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        event={selectedEvent}
      />

      {/* PopUp Modal for Date Events */}
      <DateEventsPopup
        isOpen={isDatePopupOpen}
        onClose={() => setIsDatePopupOpen(false)}
        date={selectedDate}
        events={selectedDate ? getEventsForDate(selectedDate) : []}
        onEventClick={(event: Event) => {
          setSelectedEvent(event);
          setIsPopUpOpen(true);
        }}
      />
    </div>
  );
}
