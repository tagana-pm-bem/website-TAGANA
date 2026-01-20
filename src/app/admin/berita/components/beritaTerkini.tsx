"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { beritaService, BeritaAcaraDB } from "@/services/beritaService";
import { Loader2, ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

// SHADCN UI
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";

interface BeritaWithCategory extends BeritaAcaraDB {
  kategori_berita?: {
    id: number;
    nama: string;
  };
}

interface BeritaTerkiniProps {
  refreshTrigger?: number;
}

export default function BeritaTerkini({ refreshTrigger = 0 }: BeritaTerkiniProps) {
  const router = useRouter();
  
  const [listBerita, setListBerita] = useState<BeritaWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const data = await beritaService.getAll();
        setListBerita(data as unknown as BeritaWithCategory[]);
        setCurrentPage(1); 
      } catch (error) {
        console.error("Gagal load berita terkini:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const totalPages = Math.ceil(listBerita.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = listBerita.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const cleanHtml = (htmlContent: string | null) => {
    if (!htmlContent) return "Tidak ada deskripsi.";
    return htmlContent.replace(/<[^>]+>/g, ''); 
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center px-6 pt-2">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Berita Terkini</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/admin/berita")} 
          className="text-[#044BB1] text-xs font-medium hover:bg-blue-50 transition-colors gap-1"
        >
          Lihat Semua <ArrowRight size={12} />
        </Button>
      </div>

      <div className="px-4 pb-4">
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-20 flex-col gap-3">
            <Loader2 className="animate-spin text-[#044BB1]" size={24} />
            <span className="text-xs font-medium text-slate-400">Menyinkronkan histori...</span>
          </div>
        ) : listBerita.length === 0 ? (
          <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs font-medium text-slate-400 italic">Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {currentData.map((berita) => (
              <Card 
                key={berita.id}
                onClick={() => router.push(`/admin/beritaTerkini/detail?id=${berita.id}`)}
                className="group border-slate-100 shadow-none hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden rounded-2xl"
              >
                <CardContent className="p-3">
                  <div className="flex gap-4 items-center">
                    {/* Image Container */}
                    <div className="relative w-16 h-16 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-50">
                      <Image
                        src={berita.file_url || "https://picsum.photos/200/200"}
                        alt={berita.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex items-center justify-between gap-2">
                        {berita.kategori_berita && (
                          <Badge variant="secondary" className="bg-blue-50 text-[#044BB1] text-[10px] font-medium border-none px-2 py-0">
                            {berita.kategori_berita.nama}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Calendar size={10} />
                          {formatDate(berita.created_at || berita.tanggal)}
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-slate-800 truncate group-hover:text-[#044BB1] transition-colors leading-snug">
                        {berita.judul}
                      </h3>
                      
                      <p className="text-[11px] text-slate-500 line-clamp-1 font-normal opacity-80">
                        {cleanHtml(berita.isi_berita)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION SECTION */}
      {!isLoading && listBerita.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-t border-slate-100 rounded-b-[1.5rem]">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-lg border-slate-200 disabled:opacity-30 transition-all active:scale-90"
            >
              <ChevronLeft size={14} className="text-slate-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-lg border-slate-200 disabled:opacity-30 transition-all active:scale-90"
            >
              <ChevronRight size={14} className="text-slate-600" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}