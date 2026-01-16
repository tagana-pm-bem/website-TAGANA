"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  Loader2, 
  Newspaper, 
  Users, 
  MapPin, 
  CalendarDays,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

// SERVICES
import { dusunService } from "@/services/dusunService";
import { beritaService } from "@/services/beritaService";
import { eventService } from "@/services/eventService";

// SHADCN UI
import { Card, CardContent } from "@/components/ui/card";

// 1. VARIABLE GLOBAL (DI LUAR KOMPONEN) UNTUK CACHING
// Variabel ini tidak akan hilang saat pindah halaman (unmount)
let dashboardStatsCache: any = null;

interface StatsGridProps {
  refreshTrigger?: number; 
}

export function StatsGrid({ refreshTrigger = 0 }: StatsGridProps) {
  // 2. Gunakan cache sebagai nilai awal jika tersedia
  const [stats, setStats] = useState(dashboardStatsCache || {
    totalBerita: 0,
    totalPenduduk: 0,
    totalDusun: 0,
    upcomingEvents: 0,
  });
  
  // 3. Hanya tampilkan loading jika belum ada data di cache
  const [isLoading, setIsLoading] = useState(!dashboardStatsCache);

  const fetchAllStats = useCallback(async () => {
    try {
      // Jika sudah ada cache, kita fetch di background (tidak perlu Loader2 penuh)
      if (!dashboardStatsCache) setIsLoading(true);

      const [dusunData, beritaData, eventData] = await Promise.all([
        dusunService.getAll().catch(() => []),
        beritaService.getAll().catch(() => []),
        eventService.getAll().catch(() => [])
      ]);

      const safeDusunData = Array.isArray(dusunData) ? dusunData : [];
      const safeBeritaData = Array.isArray(beritaData) ? beritaData : [];
      const safeEventData = Array.isArray(eventData) ? eventData : [];

      const totalPenduduk = safeDusunData.reduce(
        (acc, curr) => acc + (Number(curr.jumlah_penduduk) || 0), 
        0
      );

      const today = new Date().toISOString().split('T')[0];
      const upcomingEvents = safeEventData.filter((e) => e.event_date >= today).length;

      const newStats = {
        totalBerita: safeBeritaData.length,
        totalPenduduk,
        totalDusun: safeDusunData.length,
        upcomingEvents,
      };

      // 4. Update state dan SIMPAN KE CACHE
      setStats(newStats);
      dashboardStatsCache = newStats;

    } catch (error) {
      console.error("Gagal memuat ringkasan statistik:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Jalankan fetch jika data belum ada ATAU jika ada trigger perubahan data (refreshTrigger)
    if (!dashboardStatsCache || refreshTrigger > 0) {
      fetchAllStats();
    }
  }, [fetchAllStats, refreshTrigger]);

  // Loader hanya muncul saat kunjungan pertama kali (cache kosong)
  if (isLoading && !dashboardStatsCache) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="border-none shadow-sm h-[140px] flex items-center justify-center bg-white rounded-[1.5rem]">
             <Loader2 className="animate-spin text-[#044BB1] opacity-20" size={32} />
          </Card>
        ))}
      </div>
    );
  }

  const statConfig = [
    {
      label: "Total Berita",
      value: stats.totalBerita,
      desc: "Terbit & Draft",
      icon: <Newspaper size={22} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-500"
    },
    {
      label: "Total Penduduk",
      value: stats.totalPenduduk.toLocaleString('id-ID'),
      desc: "Jiwa Terdata",
      icon: <Users size={22} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-500"
    },
    {
      label: "Jumlah Dusun",
      value: stats.totalDusun,
      desc: "Wilayah Aktif",
      icon: <MapPin size={22} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-500"
    },
    {
      label: "Event Mendatang",
      value: stats.upcomingEvents,
      desc: "Agenda Terdekat",
      icon: <CalendarDays size={22} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statConfig.map((stat, idx) => (
        <Card 
          key={idx} 
          className={`border-none border-l-4 ${stat.border} shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 rounded-[1.5rem] overflow-hidden group bg-white`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                    {stat.value}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                   <div className={`${stat.bg} p-0.5 rounded-full`}>
                      <ArrowUpRight size={10} className={stat.color} />
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {stat.desc}
                  </p>
                </div>
              </div>
              
              <div className={`${stat.bg} ${stat.color} p-4 rounded-[1.25rem] group-hover:scale-110 transition-transform duration-500 shadow-inner shrink-0`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}