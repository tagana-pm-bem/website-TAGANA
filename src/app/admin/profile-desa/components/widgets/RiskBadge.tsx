'use client';

import { ShieldAlert, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";

interface RiskBadgeProps {
  level: string; // 'low' | 'medium' | 'high' | 'none'
}

export function RiskBadge({ level }: RiskBadgeProps) {
  // Pemetaan gaya visual berdasarkan tingkat risiko
  const config = {
    high: {
      label: "Risiko Tinggi",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      icon: ShieldAlert,
      desc: "Wilayah butuh perhatian khusus dan mitigasi aktif."
    },
    medium: {
      label: "Risiko Sedang",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: AlertTriangle,
      desc: "Wilayah memiliki potensi kerawanan musiman."
    },
    low: {
      label: "Risiko Rendah",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: Info,
      desc: "Wilayah relatif stabil dengan potensi gangguan kecil."
    },
    none: {
      label: "Wilayah Aman",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: ShieldCheck,
      desc: "Kondisi wilayah terpantau kondusif dan stabil."
    }
  };

  const status = config[level as keyof typeof config] || config.none;
  const Icon = status.icon;

  return (
    <Card className="border-none shadow-lg shadow-slate-200/50 rounded-[1.5rem] bg-white overflow-hidden">
      <CardContent className="p-5 flex items-start gap-4">
        <div className={`p-3 rounded-xl ${status.bg} ${status.color}`}>
          <Icon size={22} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Status Keamanan</span>
            <Badge variant="outline" className={`${status.bg} ${status.color} ${status.border} border shadow-none text-[9px] font-medium px-2 py-0`}>
              {status.label}
            </Badge>
          </div>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            {status.desc}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}