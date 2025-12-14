"use client";

import { useEffect, useState, useMemo } from "react";
import { EventCard } from "./Evencard";
import { eventService } from "@/services/eventService"; 
import { Loader2 } from "lucide-react";
import EventDetailModal from "./eventDetailModal"; 

interface EventListProps {
  filterDate: string | null;
}

export interface EventUI {
  id: number;
  bulan: string;
  tanggal: number;
  judul: string;
  deskripsi: string;
  startTime: string;
  endTime: string;
  lokasi: string;
  image: string;
  rawDate?: string; 
}

export function EventList({ filterDate }: EventListProps) {
  const [events, setEvents] = useState<EventUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedEvent, setSelectedEvent] = useState<EventUI | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const data = await eventService.getAll();

        const mappedData: EventUI[] = data.map((item: any) => {
            const dateObj = new Date(item.event_date);
            
            return {
                id: item.id, 
                bulan: dateObj.toLocaleDateString("id-ID", { month: "short" }),
                tanggal: dateObj.getDate(),
                judul: item.title,
                deskripsi: item.description || "Tidak ada deskripsi",
                startTime: item.start_time?.slice(0, 5) || "00:00",
                endTime: item.end_time?.slice(0, 5) || "Selesai",
                lokasi: item.location,
                image: item.image_url || "/default.jpg",
                rawDate: item.event_date 
            } as any;
        });

        setEvents(mappedData);
      } catch (error) {
        console.error("Gagal load events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!filterDate) {
      const today = new Date().toISOString().split('T')[0];
      return events.filter((e: any) => e.rawDate >= today);
    }
    return events.filter((e: any) => e.rawDate === filterDate);
  }, [events, filterDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <p className="text-gray-500">
           {filterDate 
             ? "Tidak ada acara pada tanggal ini." 
             : "Belum ada acara mendatang."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-4 mb-6 max-w-7xl mx-auto">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)} 
          />
        ))}
      </div>

      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
}