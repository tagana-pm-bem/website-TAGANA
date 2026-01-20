"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function HeroSection() {
  const router = useRouter();
  
  const handleScrollToPanduan = () => {
    const panduanSection = document.getElementById("panduan");
    if (panduanSection) {
      panduanSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePetaClick = () => {
    router.push("/peta-page");
  };

  const handlePanduanClick = () => {
    router.push("/panduan");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-6">
              Informasi Kebencanaan & <br className="hidden lg:block" />
              Kesiapsiagaan Warga
            </h1>

            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
              Akses data peta rawan bencana, panduan keselamatan, dan informasi
              terkini untuk Desa Sriharjo yang lebih tangguh.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handlePetaClick}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Lihat Peta Bencana
              </button>

              <button
                onClick={handlePanduanClick}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3.5 rounded-lg font-bold transition-all active:scale-95"
              >
                Panduan Warga
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-75 sm:h-100 lg:h-125"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
              <img
                src="/pengkol.png"
                alt="Peta Udara Desa"
                className="object-cover w-full h-full "
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-blue-100 rounded-full blur-xl opacity-70"></div>
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-orange-100 rounded-full blur-xl opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
