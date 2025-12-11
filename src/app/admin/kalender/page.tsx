"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EventList } from "./components/EventList";
import { EventFormModal } from "./components/EventFormModal";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description?: string;
}

export default function AdminKalenderPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Pertemuan Desa",
      date: "2025-01-15",
      time: "10:00",
      category: "meeting",
      description: "Pertemuan rutin RT/RW",
    },
    {
      id: "2",
      title: "Pelatihan Gawat Darurat",
      date: "2025-01-20",
      time: "14:00",
      category: "training",
      description: "Pelatihan pertolongan pertama",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAdd = (payload: { title: string; date: string; time: string; category: string; description?: string }) => {
    const newEvent: Event = {
      id: String(events.length + 1),
      ...payload,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDelete = (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kalender Event</h1>
          <p className="text-gray-600 mt-1">Kelola jadwal acara desa</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setShowForm(true)}>
          Tambah Event
        </Button>
      </div>

      <EventList events={events} onDelete={handleDelete} />
      <EventFormModal isOpen={showForm} onClose={() => setShowForm(false)} onAdd={handleAdd} />
    </div>
  );
}
