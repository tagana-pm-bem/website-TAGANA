"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, CalendarDays, Loader2 } from "lucide-react";
import { NewsCard } from "@/app/BeritaBencana/components/NewsCard";
import { beritaService } from "@/services/beritaService";
import { eventService } from "@/services/eventService";
import { useRouter } from "next/navigation";

interface NewsUI {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image?: string;
  location?: string;
  status: string;
}

interface AgendaUI {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
  location: string;
}

export default function BeritaSection() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsUI[]>([]);
  const [agendaList, setAgendaList] = useState<AgendaUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const stripHtml = (htmlString: string) => {
    if (!htmlString) return "";
    return htmlString.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [beritaData, eventData] = await Promise.all([
          beritaService.getAll(),
          eventService.getAll(),
        ]);

        const mappedNews: NewsUI[] = beritaData
          .slice(0, 2)
          .map((item: any) => ({
            id: item.id,
            title: item.judul,
            description: stripHtml(item.isi_berita || "Tidak ada deskripsi"),
            category: item.kategori_berita?.nama || "Umum",
            date: item.tanggal || item.created_at,
            image: item.file_url || undefined,
            location: item.lokasi || "Desa Sriharjo",
            status: item.status || "published",
          }));

        const mappedAgenda: AgendaUI[] = eventData
          .filter((e: any) => new Date(e.event_date) >= new Date())
          .slice(0, 3)
          .map((item: any) => {
            const dateObj = new Date(item.event_date);
            return {
              id: item.id,
              title: item.title,
              date: dateObj.getDate().toString(),
              month: dateObj
                .toLocaleDateString("id-ID", { month: "short" })
                .toUpperCase(),
              time: item.start_time?.slice(0, 5) || "08:00",
              location: item.location || "Balai Desa",
            };
          });

        setNewsList(mappedNews);
        setAgendaList(mappedAgenda);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-[#044BB1]" size={40} />
      </section>
    );
  }

  return (
    <section className="w-full  py-16 lg:py-48 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Berita & Informasi
              </h2>
              <button
                onClick={() => (window.location.href = "/BeritaBencana")}
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#044BB1] hover:underline underline-offset-8 transition-all"
              >
                Lihat Semua Berita
              </button>
            </div>

            {newsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsList.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <NewsCard
                      berita={news}
                      formatDate={formatDate}
                      onReadMore={(id) =>
                        (window.location.href = `/BeritaBencana/detail?id=${id}`)
                      }
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-medium">
                Belum ada berita terbaru untuk ditampilkan.
              </div>
            )}
          </div>

          {/* KOLOM KANAN: AGENDA */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 tracking-tight">
              Agenda Kegiatan
            </h2>
            <div className="space-y-6">
              {agendaList.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-50 text-[#044BB1] rounded-2xl shrink-0 group-hover:bg-[#044BB1] group-hover:text-white transition-all duration-300">
                    <span className="text-2xl font-black leading-none">
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                      {item.month}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-[#044BB1] transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Clock size={14} className="text-slate-400" />
                        {item.time} WIB
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <MapPin size={14} className="text-slate-400" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => router.push("/EventListPage")}
              className="w-full mt-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-3 text-sm active:scale-[0.98]"
            >
              <CalendarDays size={18} className="text-slate-500" />
              Lihat Semua Agenda
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
