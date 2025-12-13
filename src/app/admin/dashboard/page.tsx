"use client";

import React from "react";
import { StatsGrid } from "./components/StatsGrid";
import EventList from "../kalender/components/EventList";
import BeritaTerkini from "../berita/components/beritaTerkini";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6 mb-[100px]">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Berita Terkini</h2>
          <BeritaTerkini />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kalender Event</h2>
          <EventList />
        </div>
      </div>

    </div>
  );
}
