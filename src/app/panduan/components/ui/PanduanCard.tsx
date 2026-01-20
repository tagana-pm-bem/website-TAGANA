"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PanduanCardProps {
  title: string;
  icon: React.ReactNode;
  steps: string[];
  note?: string;
}

export default function PanduanCard({ title, icon, steps, note }: PanduanCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      </div>
      
      <div className="p-6 flex-1 space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white shrink-0 flex items-center justify-center text-[10px] font-bold">
              {idx + 1}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {step}
            </p>
          </div>
        ))}
      </div>

      {note && (
        <div className="p-4 mx-6 mb-6 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-center">
          <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
          <p className="text-xs text-emerald-700 font-medium leading-tight">
            {note}
          </p>
        </div>
      )}
    </div>
  );
}