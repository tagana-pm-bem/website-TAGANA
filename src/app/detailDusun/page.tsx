"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { dusunData } from "@/data/datadususn";
import { getDusunImageById, getDusunAltText } from "@/data/image";
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
  const [dusun, setDusun] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (dusunId) {
      const foundDusun = dusunData.find((d) => d.id === parseInt(dusunId));
      setDusun(foundDusun || null);
    }
    setMapReady(true);
  }, [dusunId]);

  if (!dusun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
        </div>
      </div>
    );
  }

  // Generate preparedness message based on risk level
  const getPreparednessMessage = (riskLevel: string): string => {
    switch (riskLevel) {
      case "high":
        return "Warga diimbau selalu siaga dan mengikuti arahan tim TAGANA. Pastikan jalur evakuasi dan titik kumpul diketahui.";
      case "medium":
        return "Tingkatkan kewaspadaan terutama saat musim hujan. Siapkan tas siaga bencana untuk keluarga.";
      case "low":
      default:
        return "Tetap waspada dan ikuti informasi dari BPBD. Lakukan simulasi evakuasi secara berkala.";
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Component */}
      <Header dusunName={dusun.name} population={dusun.population} />

      {/* Photo and Description Component */}
      <PhotoAndDescription 
        dusunName={dusun.name}
        description={dusun.description}
        imageUrl={getDusunImageById(dusun.id)}
        imageAlt={getDusunAltText(dusun.id)}
        population={dusun.population}
      />

      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Card Component */}
            <RiskCard 
              
              dusunName={dusun.name}
              disasters={dusun.disasters}
              population={dusun.population}
              preparednessMessage={getPreparednessMessage(dusun.riskLevel)}
            />

            {/* Demographics Card Component */}
            <DemographicsCard 
              dusunName={dusun.name}
              demographicData={{
                jumlahKK: dusun.jumlahKK,
                jumlahLakiLaki: dusun.jumlahLakiLaki,
                jumlahPerempuan: dusun.jumlahPerempuan,
                jumlahBalita: dusun.jumlahBalita,
                jumlahLansia: dusun.jumlahLansia,
                jumlahIbuHamil: dusun.jumlahIbuHamil,
                jumlahPenyandangDisabilitas: dusun.jumlahPenyandangDisabilitas,
                jumlahPendudukMiskin: dusun.jumlahPendudukMiskin,
              }}
            />
          </div>

          {/* Right Column - Map and Location */}
          <div className="space-y-6">
            {/* Coordinates Card Component */}
            <CoordinatesCard 
              latitude={dusun.position[0]}
              longitude={dusun.position[1]}
            />

            {/* Map Card Component */}
            {mapReady && (
              <MapCard 
                position={dusun.position}
                dusunName={dusun.name}
                population={dusun.population}
                mapReady={mapReady}
              />
            )}
          </div>
        </div>

        {/* RT List Card Component */}
        <RTListCard 
          dusunName={dusun.name}
          rtData={dusun.rtData}
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
          <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
        </div>
      </div>
    }>
      <DetailDusunContent />
    </Suspense>
  );
}
