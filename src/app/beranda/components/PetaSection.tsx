"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { dusunService, DusunDetailDB } from "@/services/dusunService";
import { bencanaService, BencanaDB } from "@/services/bencanaService";
// Pastikan LegendCard sudah di-export dari file-nya

const PetaSriharjo = dynamic(() => import("@/app/peta-page/components/petaSriharjo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-400 animate-pulse rounded-3xl border-2 border-dashed border-slate-200">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm font-bold tracking-tight">Menyiapkan Peta Sriharjo...</p>
      </div>
    </div>
  ),
});

export default function PetaSection() {
  const [selectedDusunId, setSelectedDusunId] = useState<number | null>(null);
  const [selectedDusunDetail, setSelectedDusunDetail] = useState<DusunDetailDB | null>(null);
  const [bencanaList, setBencanaList] = useState<BencanaDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mencegah error Hydration & memastikan Client-Side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (selectedDusunId) {
        try {
          setLoading(true);
          const detail = await dusunService.getDetailById(selectedDusunId);
          const bencanas = await bencanaService.getByDusunId(selectedDusunId);
          setSelectedDusunDetail(detail);
          setBencanaList(bencanas);
        } catch (e) {
          console.error("Gagal ambil detail", e);
        } finally {
          setLoading(false);
        }
      } else {
        setSelectedDusunDetail(null);
        setBencanaList([]);
      }
    };
    if (isMounted) fetchDetail();
  }, [selectedDusunId, isMounted]);

  
  const mainBencana = bencanaList.length > 0 ? bencanaList[0] : null;

  if (!isMounted) return null;

  return (
    <section id="peta-section" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-14 max-w-full">
        
        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Peta Kebencanaan</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Pantau visualisasi wilayah rawan dan data demografi real-time untuk penguatan mitigasi berbasis komunitas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* PETA CONTAINER (8/12) */}
          <div className="lg:col-span-8 relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-162.5 bg-slate-100 rounded-b-md overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative"
            >
              <PetaSriharjo 
                selectedDusunId={selectedDusunId} 
                onDusunSelect={setSelectedDusunId} 
              />

            </motion.div>
          </div>

          {/* DETAIL PANEL (4/12) */}
          <aside className="lg:col-span-4 h-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 p-8 flex flex-col h-162.5 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sinkronisasi Data...</p>
                  </motion.div>
                ) : selectedDusunDetail ? (
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col h-full"
                  >
                 

                    <h3 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                      Dusun {selectedDusunDetail.nama}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Potensi Utama</p>
                        <p className="text-sm font-bold text-slate-800">{mainBencana ? mainBencana.jenis_bencana : "Nihil"}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Total Jiwa</p>
                        <p className="text-sm font-bold text-slate-800 tabular-nums">{selectedDusunDetail.jumlah_penduduk.toLocaleString('id-ID')}</p>
                      </div>
                    </div>

                    {/* Description Box */}
                    {mainBencana && (
                      <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 mb-8">
                        <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold text-xs uppercase tracking-widest">
                          <ShieldAlert size={16} />
                          Keterangan Risiko Utama
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                          "{mainBencana.deskripsi}"
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = `/detailDusun?id=${selectedDusunDetail.id}`}
                      className="w-full mt-auto bg-[#044BB1] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all tracking-tight"
                    >
                      Eksplorasi Detail Dusun
                      <ChevronRight size={20} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center p-6"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 text-slate-300 shadow-inner">
                      <MapPin size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Pilih Titik Wilayah</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      Silakan pilih salah satu dusun pada peta untuk melihat profil risiko dan data kependudukan.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </aside>

        </div>
      </div>
    </section>
  );
}