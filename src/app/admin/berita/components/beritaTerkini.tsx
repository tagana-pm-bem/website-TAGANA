"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { beritaService, BeritaAcaraDB } from "@/services/beritaService";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="h-full w-full flex flex-col gap-4 rounded-lg">
      <div className="flex justify-between items-center border-b pb-2 border-gray-100">
        <h1 className="text-sm font-semibold text-gray-800">Berita Terkini</h1>
        <button 
          onClick={() => router.push("/admin/berita")} 
          className="text-blue-600 text-xs font-medium cursor-pointer hover:underline"
        >
          Lihat Semua
        </button>
      </div>

      {isLoading ? (
        <div className="flex w-full justify-center py-6">
          <Loader2 className="animate-spin text-gray-400" size={20} />
        </div>
      ) : listBerita.length === 0 ? (
        <div className="text-center py-4 text-xs text-gray-400 italic">
          Belum ada berita.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 min-h-[300px]">
            {currentData.map((berita) => (
              <div
                key={berita.id}
                onClick={() => router.push(`/admin/beritaTerkini/${berita.id}`)}
                className="flex flex-row gap-3 p-2 bg-white rounded-lg  hover:border-gray-200 hover:bg-gray-50 transition cursor-pointer group items-start"
              >
                <div className="relative w-[70px] h-[70px] flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={berita.file_url || "https://placehold.co/100x100?text=No+Img"}
                    alt={berita.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full min-w-0 max-w-80">
                  <h1 className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {berita.judul}
                  </h1>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-snug break-words">
                    {cleanHtml(berita.isi_berita)}
                  </p>

                  <div className="mt-1 flex items-center justify-between w-full">
                     <span className="text-[10px] text-gray-400">
                        {formatDate(berita.created_at || berita.tanggal)}
                     </span>

                     {berita.kategori_berita && (
                       <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium border border-blue-100">
                         {berita.kategori_berita.nama}
                       </span>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {listBerita.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                Hal {currentPage} dari {totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="cursor-pointer p-1 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer p-1 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}