import type { Metadata } from "next";
import HeroSection from "./components/HeroSectionPage"; 
import PetaSection from "./components/PetaSection"; 
import BeritaSection from "./components/BeritaSection"; 
import PanduanSection from "./components/PanduanSection"; 

export const metadata: Metadata = {
  title: "Sistem Informasi Kebencanaan Desa Sriharjo",
  description: "Portal informasi kebencanaan dan kesiapsiagaan warga.",
};

export default function Beranda() {
  return (
    <main className="px-4 sm:px-13 min-h-screen bg-white p-4 flex flex-col overflow-x-hidden">     
      <HeroSection />

      <div className="w-full">
        <PetaSection />
      </div>
  
      <BeritaSection />
      <div id="panduan">
        <PanduanSection />
      </div>

      
    </main>
  );
}