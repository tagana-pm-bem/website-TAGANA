"use client";

import { useEffect, useState, useMemo } from "react";
import { Clock, MapPin, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { eventService, EventDB } from "@/services/eventService";
import EventModal from "./eventModal"; 

interface EventListProps {
  refreshTrigger?: number;
  filterDate?: string | null; 
  onDataChange?: () => void; 
}

export default function EventList({ refreshTrigger = 0, filterDate = null, onDataChange }: EventListProps) {
  const [events, setEvents] = useState<EventDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventDB | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } catch (error) {
      console.error("Gagal load events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [refreshTrigger]);
  useEffect(() => { setCurrentPage(1); }, [filterDate]);

  const handleDelete = async (id: string) => {
    await eventService.delete(id);
    fetchEvents();
  };

  const handleUpdate = async (id: string, data: Partial<EventDB>) => {
    const updatedData = await eventService.update(id, data);
    
    setEvents(events.map(ev => ev.id === id ? { ...ev, ...updatedData } : ev));
    setSelectedEvent(updatedData); 
  };

  const filteredEvents = useMemo(() => {
    if (!events.length) return [];
    const today = new Date().toISOString().split('T')[0]; 
    return events.filter(event => filterDate ? event.event_date === filterDate : event.event_date >= today);
  }, [events, filterDate]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getMonthName = (dateStr: string) => new Date(dateStr).toLocaleDateString("id-ID", { month: "short" });
  const getDateNumber = (dateStr: string) => new Date(dateStr).getDate();
  const formatTime = (timeStr: string) => timeStr ? timeStr.slice(0, 5) : "";

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-400" /></div>;

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500 text-sm">{filterDate ? "Tidak ada acara tanggal ini." : "Belum ada acara mendatang."}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="shadow-lg rounded-xl p-3 flex flex-row gap-3 items-start border border-gray-200  mt-3 bg-white transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center min-w-[55px] h-[55px] bg-blue-50 border border-blue-100 rounded-lg flex-shrink-0">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{getMonthName(event.event_date)}</span>
                <span className="font-bold text-lg text-gray-800 leading-none">{getDateNumber(event.event_date)}</span>
              </div>
              <div className="flex flex-col gap-1 w-full min-w-0">
                <h1 className="font-semibold text-sm sm:text-base text-gray-800 truncate">{event.title}</h1>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{event.description || "-"}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-blue-500" />
                    <span className="text-xs text-gray-500">{formatTime(event.start_time)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-blue-500" />
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="relative w-[60px] h-[60px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image src={event.image_url || "/images/placeholder-news.jpg"} alt={event.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">Hal {currentPage} dari {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 border border-gray-200"><ChevronLeft size={16} /></button>
              <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 border border-gray-200"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}