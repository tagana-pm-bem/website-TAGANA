"use client";

import React from "react";
import { EventCard } from "./EventCard";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description?: string;
}

export function EventList({ events, onDelete }: { events: Event[]; onDelete: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((ev) => (
        <EventCard key={ev.id} event={ev} onDelete={onDelete} />
      ))}
    </div>
  );
}
