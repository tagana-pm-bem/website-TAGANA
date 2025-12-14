"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Status, Kategori } from "../types";
import {
  KATEGORI_CONFIG,
  STATUS_BADGE,
  KATEGORI_BENCANA,
  KATEGORI_UMUM,
} from "../constants";

const statusBadge = (status: Status) => {
  return STATUS_BADGE[status];
};

const kategoriBadge = (kategori: Kategori) => {
  return KATEGORI_CONFIG[kategori].badge;
};

export default function BeritaList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [kategoriFilter, setKategoriFilter] = useState<"all" | Kategori>("all");

  const beritaDummy: {
    id: number;
    image: string;
    judul: string;
    tanggal: string;
    status: Status;
    kategori: Kategori;
  }[] = [
    // Kategori Bencana
    {
      id: 1,
      image: "/ketos.png",
      judul: "Banjir Melanda Dusun A, Warga Mengungsi",
      tanggal: "12 Mar 2025",
      status: "published",
      kategori: "banjir",
    },
    {
      id: 2,
      image: "/ketos.png",
      judul: "Tanah Longsor di Dusun B, Akses Jalan Terputus",
      tanggal: "11 Mar 2025",
      status: "published",
      kategori: "longsor",
    },
    {
      id: 3,
      image: "/ketos.png",
      judul: "Kebakaran Hutan di Area Lereng Gunung",
      tanggal: "10 Mar 2025",
      status: "draft",
      kategori: "kebakaran",
    },
    {
      id: 4,
      image: "/ketos.png",
      judul: "Banjir Bandang Merusak Jembatan Penghubung",
      tanggal: "09 Mar 2025",
      status: "published",
      kategori: "banjir",
    },
    {
      id: 5,
      image: "/ketos.png",
      judul: "Gempa 5.2 SR Guncang Wilayah Yogyakarta",
      tanggal: "08 Mar 2025",
      status: "published",
      kategori: "gempa",
    },
    // Kategori Umum - Sosial
    {
      id: 6,
      image: "/ketos.png",
      judul: "Program Gotong Royong Bersih Desa Tahun 2025",
      tanggal: "07 Mar 2025",
      status: "published",
      kategori: "sosial",
    },
    // Kategori Umum - Kesehatan
    {
      id: 7,
      image: "/ketos.png",
      judul: "Vaksinasi Gratis untuk Anak-anak Desa",
      tanggal: "06 Mar 2025",
      status: "published",
      kategori: "kesehatan",
    },
    // Kategori Umum - Ekonomi
    {
      id: 8,
      image: "/ketos.png",
      judul: "UMKM Lokal Dapat Bantuan Modal Usaha",
      tanggal: "05 Mar 2025",
      status: "draft",
      kategori: "ekonomi",
    },
    // Kategori Umum - Pendidikan
    {
      id: 9,
      image: "/ketos.png",
      judul: "Sekolah Desa Raih Prestasi Nasional Olahraga",
      tanggal: "04 Mar 2025",
      status: "published",
      kategori: "pendidikan",
    },
    // Kategori Umum - Acara
    {
      id: 10,
      image: "/ketos.png",
      judul: "Festival Budaya Desa Akan Digelar Bulan Depan",
      tanggal: "03 Mar 2025",
      status: "published",
      kategori: "acara",
    },
    // Kategori Umum - Umum
    {
      id: 11,
      image: "/ketos.png",
      judul: "Perbaikan Infrastruktur Jalan Desa Dimulai",
      tanggal: "02 Mar 2025",
      status: "published",
      kategori: "umum",
    },
  ];

  // Filter dan search logic
  const filteredBerita = useMemo(() => {
    return beritaDummy.filter((berita) => {
      // Filter berdasarkan search query
      const matchesSearch = berita.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter berdasarkan status
      const matchesStatus =
        statusFilter === "all" || berita.status === statusFilter;

      // Filter berdasarkan kategori
      const matchesKategori =
        kategoriFilter === "all" || berita.kategori === kategoriFilter;

      return matchesSearch && matchesStatus && matchesKategori;
    });
  }, [searchQuery, statusFilter, kategoriFilter]);

  // Handler untuk klik berita - navigate ke halaman kategori
  const handleBeritaClick = (kategori: Kategori) => {
    router.push(`/admin/beritaTerkini/${kategori}`);
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 sm:gap-5 md:gap-6 rounded-lg p-3 sm:p-4 md:p-6">
      {/* Filter & Search Section */}
      <div className="space-y-4 sm:space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
            aria-label="Cari berita"
          />
          <svg
            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Status Filter Buttons */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 px-1">
            Status:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <button
              onClick={() => setStatusFilter("all")}
              className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                statusFilter === "all"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                statusFilter === "published"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                statusFilter === "draft"
                  ? "bg-gray-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Draft
            </button>
          </div>
        </div>

        {/* Kategori Filter Buttons - Bencana */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 px-1">
            Kategori Bencana:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <button
              onClick={() => setKategoriFilter("all")}
              className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                kategoriFilter === "all"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Semua
            </button>
            {KATEGORI_BENCANA.map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriFilter(kat)}
                className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap capitalize shadow-sm border ${
                  kategoriFilter === kat
                    ? KATEGORI_CONFIG[kat].activeBadge + " shadow-md"
                    : "bg-white " +
                      KATEGORI_CONFIG[kat].badge +
                      " hover:opacity-90 border-gray-200"
                }`}
              >
                {kat.charAt(0).toUpperCase() + kat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Kategori Filter Buttons - Umum */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 px-1">
            Kategori Umum:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {KATEGORI_UMUM.map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriFilter(kat)}
                className={`flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap capitalize shadow-sm border ${
                  kategoriFilter === kat
                    ? KATEGORI_CONFIG[kat].activeBadge + " shadow-md"
                    : "bg-white " +
                      KATEGORI_CONFIG[kat].badge +
                      " hover:opacity-90 border-gray-200"
                }`}
              >
                {kat.charAt(0).toUpperCase() + kat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between px-1 py-2">
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
            Menampilkan{" "}
            <span className="text-blue-600 font-semibold">
              {filteredBerita.length}
            </span>{" "}
            dari <span className="font-semibold">{beritaDummy.length}</span>{" "}
            berita
          </p>
        </div>
      </div>

      {/* Berita List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {filteredBerita.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg
              className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-2">
              Tidak ada berita ditemukan
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        ) : (
          filteredBerita.map((berita, index) => (
            <article
              key={berita.id}
              onClick={() => handleBeritaClick(berita.kategori)}
              className="bg-white rounded-lg sm:rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={berita.image}
                  alt={berita.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority={index < 3}
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 space-y-4">
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize border ${kategoriBadge(
                      berita.kategori
                    )}`}
                  >
                    {berita.kategori}
                  </span>
                  <span
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize ${statusBadge(
                      berita.status
                    )}`}
                  >
                    {berita.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-900 hover:text-blue-600 transition-colors">
                  {berita.judul}
                </h2>

                {/* Author & Date */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">
                      T
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      Tim TAGANA Sriharjo
                    </p>
                    <time
                      dateTime={berita.tanggal}
                      className="text-xs sm:text-sm text-gray-500"
                    >
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
