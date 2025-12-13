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
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const fetchDusun = async () => {
      if (dusunId) {
        setLoading(true);
        try {
          const data = await dusunService.getDetailById(parseInt(dusunId));
          setDusun(data);
        } catch (error) {
          console.error("Gagal mengambil data dusun:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDusun();
    setMapReady(true);
  }, [dusunId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
        </div>
      </div>
    );
  }

  if (!dusun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 font-semibold">Data Dusun tidak ditemukan.</p>
      </div>
    );
  }

  const getPreparednessMessage = (riskLevel: string): string => {
    switch (riskLevel) {
      case "high": return "Warga diimbau selalu siaga dan mengikuti arahan tim TAGANA. Pastikan jalur evakuasi diketahui.";
      case "medium": return "Tingkatkan kewaspadaan terutama saat musim hujan. Siapkan tas siaga bencana.";
      default: return "Tetap waspada dan ikuti informasi dari BPBD. Lakukan simulasi evakuasi secara berkala.";
    }
  };

  const mappedDisasters = dusun.bencana?.map(b => ({
    type: b.jenis_bencana,
    severity: b.level_resiko,
    description: b.deskripsi,
    icon: b.icon
  }));

  return (
    <div className="w-full min-h-screen bg-white">
      <Header dusunName={dusun.nama} population={dusun.jumlah_penduduk} />

      <PhotoAndDescription 
        dusunName={dusun.nama}
        description={dusun.deskripsi} 
        imageUrl={dusun.gambar_url || "/placeholder-image.jpg"} 
        imageAlt={`Foto Dusun ${dusun.nama}`}
        population={dusun.jumlah_penduduk}
      />

      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Info Cards */}
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

          {/* Right Column - Map and Location */}
          <div className="space-y-6">
            {/* Coordinates Card */}
            <CoordinatesCard 
              latitude={dusun.latitude}
              longitude={dusun.longitude}
            />

            {/* Map Card */}
            {mapReady && (
              <MapCard 
                position={[dusun.latitude, dusun.longitude]} // MapCard biasanya butuh array [lat, long]
                dusunName={dusun.nama}
                population={dusun.jumlah_penduduk}
                mapReady={mapReady}
              />
            )}
          </div>
        </div>

        {/* RT List Card */}
        {/* Pastikan komponen RTListCard bisa menerima struktur data dari DB atau mapping dulu */}
        <RTListCard 
          dusunName={dusun.nama}
          rtData={dusun.rt} // DB mengembalikan array RT di dalam objek dusun
        />
      </div>
    </div>
  );
}

export default function DetailDusunPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat...</p>
        </div>
      </div>
    }>
      <DetailDusunContent />
    </Suspense>
  );
}