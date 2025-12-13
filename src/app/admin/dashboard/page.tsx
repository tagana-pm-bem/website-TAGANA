"use client";

import React from "react";
import { StatsGrid } from "./components/StatsGrid";
import EventList from "../kalender/components/EventList";
import BeritaTerkini from "../berita/components/beritaTerkini";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  
  return (
    <div className="p-6 space-y-6 mb-[100px]">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Berita Terkini</h2>
          <BeritaTerkini />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Kalender Event</h2>
            <button 
              onClick={() => router.push('/admin/KalenderEventlist')} 
              className="text-blue-500 text-sm cursor-pointer hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <EventList />
        </div>
      </div>
    </div>
  );
}
