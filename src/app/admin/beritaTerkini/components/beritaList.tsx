"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Status, Kategori } from "../types";
// Import helper baru untuk style dinamis
import { getKategoriStyle } from "../constants"; 

import { beritaService } from "@/services/beritaService";
import FilterSection from "./FilterSection"; 

interface BeritaUI {
  id: string; 
  image: string;
  judul: string;
  tanggal: string;
  status: Status;
  kategori: string; // Ubah ke string agar fleksibel
  penulis: string;
}

export default function BeritaList() {
  const router = useRouter();
  
  const [beritaList, setBeritaList] = useState<BeritaUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  // Ubah tipe filter ke string agar sesuai dengan data DB
  const [kategoriFilter, setKategoriFilter] = useState<"all" | string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await beritaService.getAll();
        
        const mappedData: BeritaUI[] = data.map((item: any) => {
          // Ambil nama kategori langsung dari relasi DB
          const kategoriName = item.kategori_berita?.nama || "Umum";
          
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

      // Bandingkan secara case-insensitive untuk keamanan
      const matchesKategori =
        kategoriFilter === "all" || 
        berita.kategori.toLowerCase() === kategoriFilter.toLowerCase();

      return matchesSearch && matchesKategori;
    });
  }, [searchQuery, kategoriFilter, beritaList]);

  const handleBeritaClick = (id: string) => {
    router.push(`/admin/beritaTerkini/detail?id=${id}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      
      {/* 1. BAGIAN FILTER */}
      <div className="w-full">
        <FilterSection 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          kategoriFilter={kategoriFilter}
          onKategoriChange={setKategoriFilter}
          resultCount={filteredBerita.length}
          totalCount={beritaList.length}
        />
      </div>

      {/* 2. BAGIAN KONTEN */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredBerita.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-xl font-medium text-gray-700 mb-2">Tidak ada berita ditemukan</p>
          <p className="text-sm text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBerita.map((berita, index) => {
            // Gunakan helper getKategoriStyle di sini
            const style = getKategoriStyle(berita.kategori);

            return (
              <article
                key={berita.id}
                onClick={() => handleBeritaClick(berita.id)}
                className="bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
                   {/* Badge Kategori menggunakan style dari helper */}
                   <span className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${style.badge}`}>
                      {berita.kategori}
                   </span>
                  
                  <Image
                    src={berita.image}
                    alt={berita.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    priority={index < 3} 
                    unoptimized={berita.image.startsWith('http') ? false : true}
                  />
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                     <span>{berita.tanggal}</span>
                     <span>•</span>
                     <span>{berita.penulis}</span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                    {berita.judul}
                  </h2>
                  
                  {/* Spacer & Footer */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                     <span className={`text-xs font-medium px-2 py-1 rounded ${berita.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {berita.status === 'published' ? 'Published' : 'Draft'}
                     </span>
                     <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                        Baca Detail →
                     </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}