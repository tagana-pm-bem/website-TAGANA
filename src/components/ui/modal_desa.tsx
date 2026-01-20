"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, MapPin, Users, Home, Activity, 
  Baby, Accessibility, HeartPulse, User, 
  Info, TrendingUp, Compass 
} from "lucide-react";
import { useDemographics } from "@/hooks/useDemographics";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: ModalProps) {
  const stats = useDemographics();
  const luasWilayah = 502.36;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Framer Motion Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 } 
    },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white flex flex-col"
          >
            {/* Header - Sticky with Glassmorphism */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#044BB1] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Info size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Profil Desa Sriharjo</h2>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Sistem Informasi Desa</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full p-2.5 transition-all duration-300 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {stats.isLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-48 bg-slate-100 rounded-4xl"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-slate-100 rounded-2xl"></div>
                    <div className="h-32 bg-slate-100 rounded-2xl"></div>
                    <div className="h-32 bg-slate-100 rounded-2xl"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  
                  {/* --- SECTION 1: GEOGRAFIS --- */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-6 w-1 bg-blue-600 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-900">Letak Geografis</h3>
                    </div>
                    <div className="bg-slate-50/50 border border-slate-100 rounded-4xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl -mr-20 -mt-20" />
                      <p className="text-slate-600 leading-relaxed font-medium mb-8 relative z-10 italic">
                        "Sriharjo adalah pusat keasrian di Kecamatan Imogiri, Bantul. Dikelilingi perbukitan dan dialiri sungai yang memberi kehidupan bagi 13 dusun di dalamnya."
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                          <Compass className="text-blue-600 mb-2" size={18} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Luas Wilayah</p>
                          <p className="text-lg font-bold text-slate-900">{luasWilayah} <span className="text-xs font-medium">Ha</span></p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                          <MapPin className="text-blue-600 mb-2" size={18} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Dusun</p>
                          <p className="text-lg font-bold text-slate-900">13 <span className="text-xs font-medium">Wilayah</span></p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                          <TrendingUp className="text-blue-600 mb-2" size={18} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ketinggian</p>
                          <p className="text-lg font-bold text-slate-900">58 <span className="text-xs font-medium">mdpl</span></p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* --- SECTION 2: STATISTIK UTAMA --- */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-900">Statistik Utama</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="bg-linear-to-br from-blue-500 to-blue-700 p-6 rounded-4xl text-white shadow-xl shadow-blue-100">
                        <Users className="opacity-40 mb-4" size={24} />
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Total Penduduk</p>
                        <p className="text-3xl font-bold tracking-tight tabular-nums">{stats.totalPenduduk.toLocaleString('id-ID')}</p>
                        <p className="text-[10px] mt-2 font-medium bg-white/20 inline-block px-2 py-0.5 rounded-full">Jiwa Tercatat</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm">
                        <Home className="text-emerald-500 mb-4" size={24} />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Keluarga</p>
                        <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats.totalKK.toLocaleString('id-ID')}</p>
                        <p className="text-[10px] mt-2 font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-full">Kepala Keluarga</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm">
                        <Activity className="text-orange-500 mb-4" size={24} />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Kepadatan</p>
                        <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats.kepadatan}</p>
                        <p className="text-[10px] mt-2 font-medium text-orange-600 bg-orange-50 inline-block px-2 py-0.5 rounded-full">Jiwa / Ha</p>
                      </div>
                    </div>
                  </section>

                  {/* --- SECTION 3: KOMPOSISI GENDER --- */}
                  <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8">
                    <h4 className="font-bold text-slate-800 mb-8 text-center uppercase tracking-widest text-xs">Proporsi Gender</h4>
                    <div className="flex flex-col gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><User size={16}/></div>
                            <span className="text-sm font-bold text-slate-700">Laki-laki</span>
                          </div>
                          <p className="text-sm font-bold text-blue-600 tabular-nums">
                            {stats.lakiLaki.toLocaleString('id-ID')} <span className="text-slate-400 font-medium ml-1">({((stats.lakiLaki / stats.totalPenduduk) * 100).toFixed(1)}%)</span>
                          </p>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.lakiLaki / stats.totalPenduduk) * 100}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center"><User size={16}/></div>
                            <span className="text-sm font-bold text-slate-700">Perempuan</span>
                          </div>
                          <p className="text-sm font-bold text-pink-600 tabular-nums">
                            {stats.perempuan.toLocaleString('id-ID')} <span className="text-slate-400 font-medium ml-1">({((stats.perempuan / stats.totalPenduduk) * 100).toFixed(1)}%)</span>
                          </p>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.perempuan / stats.totalPenduduk) * 100}%` }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                            className="h-full bg-pink-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* --- SECTION 4: KELOMPOK RENTAN --- */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-6 w-1 bg-amber-500 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-900">Kelompok Prioritas</h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Balita", val: stats.balita, icon: <Baby size={18}/>, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Lansia", val: stats.lansia, icon: <Users size={18}/>, color: "text-orange-600", bg: "bg-orange-50" },
                        { label: "Ibu Hamil", val: stats.ibuHamil, icon: <HeartPulse size={18}/>, color: "text-rose-600", bg: "bg-rose-50" },
                        { label: "Disabilitas", val: stats.disabilitas, icon: <Accessibility size={18}/>, color: "text-violet-600", bg: "bg-violet-50" },
                      ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-300 p-5 rounded-3xl transition-all hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5">
                          <div className={`w-9 h-9 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                            {item.icon}
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                          <p className="text-xl font-bold text-slate-900">{item.val.toLocaleString('id-ID')}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              )}
            </div>

            {/* Footer Footer */}
            <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Terakhir: Januari 2026</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Database Terhubung</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}