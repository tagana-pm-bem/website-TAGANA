"use client";

import React from "react";
import { CategoryBadge } from "./CategoryBadge";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description?: string;
}

export function EventCard({ event, onDelete }: { event: Event; onDelete: (id: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-bold text-gray-800">{event.title}</h3>
          <div className="text-sm text-gray-600 mt-1">
            <span>📅 {new Date(event.date).toLocaleDateString("id-ID")}</span>
            <span className="mx-2">•</span>
            <span>⏰ {event.time}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CategoryBadge category={event.category} />
          <button
            onClick={() => onDelete(event.id)}
            className="text-red-600 hover:text-red-900 font-medium text-sm"
            aria-label={`Hapus ${event.title}`}
          >
            ✕
          </button>
        </div>
      </div>

      {event.description && (
        <p className="text-sm text-gray-700 mt-2 border-t border-gray-100 pt-2">{event.description}</p>
      )}
    </div>
  );
}
