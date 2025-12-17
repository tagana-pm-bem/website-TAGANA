"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Status, Kategori } from "../types";
import { KATEGORI_CONFIG } from "../constants"; 

import { beritaService } from "@/services/beritaService";
import FilterSection from "./FilterSection"; 

interface BeritaUI {
  id: string; 
  image: string;
  judul: string;
  tanggal: string;
  status: Status;
  kategori: Kategori;
  penulis: string;
}

const kategoriBadge = (kategori: string) => {
  return KATEGORI_CONFIG[kategori as Kategori]?.badge || "bg-gray-100 text-gray-700";
};

export default function BeritaList() {
  const router = useRouter();
  
  const [beritaList, setBeritaList] = useState<BeritaUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState<"all" | Kategori>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await beritaService.getAll();
        
        const mappedData: BeritaUI[] = data.map((item: any) => {
          const kategoriName = item.kategori_berita?.nama?.toLowerCase() || "umum";
          return {
            id: item.id,
            judul: item.judul,
            image: item.file_url || "/images/placeholder-news.jpg", 
            tanggal: new Date(item.created_at || item.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }),
            status: item.status || "draft",
            kategori: kategoriName,
            penulis: item.penulis || "Admin"
          };
        });

        setBeritaList(mappedData);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBerita = useMemo(() => {
    return beritaList.filter((berita) => {
      const matchesSearch = berita.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesKategori =
        kategoriFilter === "all" || berita.kategori === kategoriFilter;

      return matchesSearch && matchesKategori;
    });
  }, [searchQuery, kategoriFilter, beritaList]);

  const handleBeritaClick = (id: string) => {
    router.push(`/admin/beritaTerkini/detail?id=${id}`);
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 sm:gap-5 md:gap-6 rounded-lg p-3 sm:p-4 md:p-6">
      <div>
      <FilterSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        kategoriFilter={kategoriFilter}
        onKategoriChange={setKategoriFilter}
        resultCount={filteredBerita.length}
        totalCount={beritaList.length}
      />

      </div>

      <div className="flex flex-col gap-3 sm:gap-4 mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : filteredBerita.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-2">Tidak ada berita ditemukan</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          filteredBerita.map((berita, index) => (
            <article
              key={berita.id}
              onClick={() => handleBeritaClick(berita.id)}
              className="bg-white rounded-lg sm:rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 overflow-hidden"
            >
              <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={berita.image}
                  alt={berita.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority={index < 3} 
                  unoptimized={berita.image.startsWith('http') ? false : true}
                />
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize border ${kategoriBadge(berita.kategori)}`}>
                    {berita.kategori}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                  {berita.judul}
                </h2>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {berita.penulis.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {berita.penulis}
                    </p>
                    <time className="text-xs sm:text-sm text-gray-500">
                      {berita.tanggal}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}