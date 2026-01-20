"use client";

import { useState } from "react";
// Shadcn UI & Lucide Icons
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { CalendarDays, ListFilter, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import MobileCalendar from "./calendar"; // Pastikan file ini menggunakan desain baru kita
import EventList from "./EventList";
import { EventDB } from "@/services/eventService"; 

interface AgendaProps {
  refreshTrigger?: number;
  events?: EventDB[];
}

export default function Agenda({ refreshTrigger, events = [] }: AgendaProps) {
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const getTitle = () => {
    if (filterDate) {
      const dateObj = new Date(filterDate);
      return `Acara Tanggal ${dateObj.toLocaleDateString("id-ID", { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      })}`;
    }
    return "Agenda Mendatang";
  };

  return (
    <Card className="w-full border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
      {/* HEADER UTAMA */}
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 sm:p-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
              <CalendarDays size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-medium text-slate-900 tracking-tight">
                Kalender Kegiatan
              </CardTitle>
              <CardDescription className="text-sm font-medium text-slate-500">
                Pantau seluruh agenda dan acara desa.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-10">
        {/* KALENDER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <MobileCalendar onSelectDate={setFilterDate} events={events} />
        </motion.div>

        {/* LIST EVENT SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#044BB1] rounded-full" />
              <h2 className="text-lg font-medium text-slate-800 tracking-tight">
                {getTitle()}
              </h2>
            </div>
            
            <AnimatePresence>
              {filterDate && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFilterDate(null)} 
                    className="text-[#044BB1] font-bold hover:bg-blue-50 rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Reset Filter
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LIST COMPONENT */}
          <div className="bg-slate-50/50 rounded-[1.5rem] border border-slate-100 p-2 min-h-[300px]">
             <EventList refreshTrigger={refreshTrigger} filterDate={filterDate} />
          </div>
        </div>
      </CardContent>

      {/* FOOTER HINT */}
      <div className="p-4 bg-slate-50/30 text-center border-t border-slate-50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <ListFilter size={12} />
          Gunakan filter tanggal untuk melihat agenda spesifik
        </p>
      </div>
    </Card>
  );
}