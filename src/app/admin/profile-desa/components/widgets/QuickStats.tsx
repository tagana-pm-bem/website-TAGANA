'use client';

import { Users, Home, UserRound, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { DusunDB } from "@/services/dusunService";

interface QuickStatsProps {
  data: DusunDB;
}

// --- KOMPONEN SKELETON (Untuk Loading State) ---
export function QuickStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-none shadow-lg shadow-slate-200/50 rounded-[1.5rem] bg-white overflow-hidden animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3 flex-1">
                {/* Skeleton Label */}
                <Skeleton className="h-3 w-24 rounded-md bg-slate-100" />
                {/* Skeleton Value */}
                <Skeleton className="h-8 w-32 rounded-md bg-slate-100" />
                {/* Skeleton Badge */}
                <Skeleton className="h-5 w-20 rounded-lg bg-slate-100" />
              </div>
              {/* Skeleton Icon Box */}
              <Skeleton className="h-14 w-14 rounded-4xl bg-slate-50 shadow-inner" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- KOMPONEN UTAMA ---
export function QuickStats({ data }: QuickStatsProps) {
  const stats = [
    {
      label: "Total Penduduk",
      value: data.jumlah_penduduk.toLocaleString('id-ID'),
      desc: "Jiwa Terdaftar",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Kepala Keluarga",
      value: data.jumlah_kk,
      desc: "KK Terdata",
      icon: Home,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Warga Lansia",
      value: data.jumlah_lansia,
      desc: "Kelompok Rentan",
      icon: UserRound,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <Card 
          key={idx} 
          className="border-none shadow-lg shadow-slate-200/50 rounded-[1.5rem] overflow-hidden bg-white group hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-medium text-slate-900 tabular-nums">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                   <Badge variant="secondary" className={`${stat.bg} ${stat.color} hover:${stat.bg} border-none text-[9px] px-1.5 py-0 font-medium`}>
                    <TrendingUp size={10} className="mr-1" />
                    {stat.desc}
                  </Badge>
                </div>
              </div>
              
              <div className={`${stat.bg} ${stat.color} p-4 rounded-[1.25rem] group-hover:scale-110 transition-transform duration-500 shadow-inner shrink-0`}>
                <stat.icon size={22} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}