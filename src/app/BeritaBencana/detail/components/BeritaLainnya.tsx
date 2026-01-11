"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { beritaService, BeritaAcaraDB } from "@/services/beritaService";
import { Calendar, Tag } from "lucide-react";

const topikPopuler = [
  "Kesehatan",
  "Pembangunan",
  "Bencana Alam",
  "Pendidikan",
  "UMKM",
  "Pemuda",
];

export default function BeritaLainnya() {
  const [beritaTerkini, setBeritaTerkini] = useState<BeritaAcaraDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const data = await beritaService.getAll();
        // Hanya ambil berita dengan status 'published' dan ambil 3 teratas
        const activeNews = data
          .filter((item: any) => item.status === "published")
          .slice(0, 3);
        setBeritaTerkini(activeNews);
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="space-y-6">
      {/* Card Berita Terkini */}
      <div className="bg-white rounded-3xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
          Berita Terkini
        </h2>

        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0" />
                <div className="flex-1 py-1">
                  <div className="h-4 bg-slate-100 rounded-md w-full mb-2" />
                  <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {beritaTerkini.map((berita) => (
              <Link
                key={berita.id}
                href={`/BeritaBencana/detail?id=${berita.id}`}
                className="flex gap-4 group transition-all"
              >
                <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  {berita.file_url ? (
                    <Image
                      src={berita.file_url}
                      alt={berita.judul}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Tag size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 py-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                    {berita.judul}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar size={12} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      {new Date(berita.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Card Topik Populer */}
      <div className="bg-white rounded-3xl  p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-teal-500 rounded-full" />
          Topik Populer
        </h2>

        <div className="flex flex-wrap gap-2">
          {topikPopuler.map((topik) => (
            <Link
              key={topik}
              href={`/BeritaBencana?topik=${topik.toLowerCase().replace(" ", "-")}`}
              className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-100"
            >
              {topik}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}