"use client";

import React from "react";
import { StatsGrid } from "./components/StatsGrid";
import { ActivityChart } from "./components/ActivityChart";
import EventList from "../kalender/components/EventList";
import BeritaTerkini from "../berita/components/beritaTerkini";
import berita from "../berita/page";
import KelolaBeritaPage from "../berita/page";
import AddAction from "../kependudukan/components/ActionButton/Addaction";
import AddEvent from "../kalender/components/addEvent";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kelola Berita</h2>
          <AddAction/>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kalender Event</h2>
          <EventList />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <BeritaTerkini />

      </div>
        <AddEvent />

    </div>
  );
}
