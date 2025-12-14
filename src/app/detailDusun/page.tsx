"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { dusunService, DusunDetailDB } from "@/services/dusunService";

import Header from "./components/Header";
import PhotoAndDescription from "./components/PhotoAndDescription";
import RiskCard from "./components/RiskCard";
import DemographicsCard from "./components/DemographicsCard";
import CoordinatesCard from "./components/CoordinatesCard";
import MapCard from "./components/MapCard";
import RTListCard from "./components/RTListCard";

function DetailDusunContent() {
  const searchParams = useSearchParams();
  const dusunId = searchParams.get("id");
  const [dusun, setDusun] = useState<DusunDetailDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const fetchDusun = async () => {
      if (!dusunId) {
        setError("ID Dusun tidak ditemukan");
        setLoading(false);
        return;
      }

      const parsedId = parseInt(dusunId);
      if (isNaN(parsedId)) {
        setError("ID Dusun tidak valid");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await dusunService.getDetailById(parsedId);
        if (!data) {
          setError("Data Dusun tidak ditemukan");
        } else {
          setDusun(data);
          setMapReady(true);
        }
      } catch (error) {
        console.error("Gagal mengambil data dusun:", error);
        setError("Gagal memuat data dusun. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchDusun();
  }, [dusunId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-sm md:text-base">
            Memuat Data Dusun...
          </p>
        </div>
      </div>
    );
  }

  if (error || !dusun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              className="w-16 h-16 md:w-20 md:h-20 mx-auto text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-red-500 font-semibold text-base md:text-lg mb-4">
            {error || "Data Dusun tidak ditemukan"}
          </p>
          <a
            href="/peta-page"
            className="inline-block px-6 py-2 bg-[#044BB1] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            Kembali ke Peta
          </a>
        </div>
      </div>
    );
  }

  const getPreparednessMessage = (riskLevel: string): string => {
    switch (riskLevel) {
      case "high":
        return "Warga diimbau selalu siaga dan mengikuti arahan tim TAGANA. Pastikan jalur evakuasi diketahui.";
      case "medium":
        return "Tingkatkan kewaspadaan terutama saat musim hujan. Siapkan tas siaga bencana.";
      default:
        return "Tetap waspada dan ikuti informasi dari BPBD. Lakukan simulasi evakuasi secara berkala.";
    }
  };

  const mappedDisasters = dusun.bencana?.map((b) => ({
    type: b.jenis_bencana,
    severity: b.level_resiko,
    description: b.deskripsi,
    icon: b.icon,
  }));

  const mappedRTData = dusun.rt?.map((rtItem) => ({
    rt: Number(rtItem.nomor_rt) || 0,
    
    nama: rtItem.nama_ketua || "Belum ada data",

    lp: (rtItem.jenis_kelamin_ketua as "L" | "P") || undefined
  })) || [];

  return (
    <main className="w-full min-h-screen bg-white">
      <Header dusunName={dusun.nama} population={dusun.jumlah_penduduk} />

      <PhotoAndDescription
        dusunName={dusun.nama}
        description={dusun.deskripsi}
        imageUrl={dusun.gambar_url || "/placeholder-image.jpg"}
        imageAlt={`Foto Dusun ${dusun.nama}`}
        population={dusun.jumlah_penduduk}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <RiskCard
              riskLevel={dusun.level_resiko}
              dusunName={dusun.nama}
              disasters={mappedDisasters}
              population={dusun.jumlah_penduduk}
              preparednessMessage={getPreparednessMessage(dusun.level_resiko)}
            />

            <DemographicsCard
              dusunName={dusun.nama}
              demographicData={{
                jumlahKK: dusun.jumlah_kk,
                jumlahLakiLaki: dusun.jumlah_laki_laki,
                jumlahPerempuan: dusun.jumlah_perempuan,
                jumlahBalita: dusun.jumlah_balita,
                jumlahLansia: dusun.jumlah_lansia,
                jumlahIbuHamil: dusun.jumlah_ibu_hamil,
                jumlahPenyandangDisabilitas: dusun.jumlah_disabilitas,
                jumlahPendudukMiskin: dusun.jumlah_miskin,
              }}
            />
          </div>
          
          <div className="space-y-6">
            <CoordinatesCard
              latitude={dusun.latitude}
              longitude={dusun.longitude}
            />

            {mapReady && (
              <MapCard
                position={[dusun.latitude, dusun.longitude]}
                dusunName={dusun.nama}
                population={dusun.jumlah_penduduk}
                mapReady={mapReady}
              />
            )}
          </div>
        </div>

        <RTListCard dusunName={dusun.nama} rtData={mappedRTData} />
      </div>
    </main>
  );
}

export default function DetailDusunPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold text-sm md:text-base">
              Memuat...
            </p>
          </div>
        </div>
      }
    >
      <DetailDusunContent />
    </Suspense>
  );
}