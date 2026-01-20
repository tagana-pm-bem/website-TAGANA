"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Backpack, Siren, HeartHandshake, ArrowRight, 
  X, Phone, ShieldAlert
} from "lucide-react";
import { createPortal } from "react-dom";

// --- DATA PANDUAN YANG LEBIH LENGKAP & ESTETIK ---
const PANDUAN_CONTENT = {
  pra: {
    title: "Langkah Mitigasi",
    subtitle: "Persiapan Sebelum Terjadi Bencana",
    color: "blue",
    icon: <Backpack className="text-blue-600" size={32} />,
    steps: [
      { title: "Tas Siaga", desc: "Siapkan pakaian, obat pribadi, senter, dan dokumen di satu tas yang mudah dijangkau." },
      { title: "Rute Evakuasi", desc: "Pahami jalur evakuasi dusun menuju titik kumpul tertinggi/aman." },
      { title: "Kontak Darurat", desc: "Simpan nomor HP Kepala Dusun dan relawan TAGANA Sriharjo." },
      { title: "EWS Mandiri", desc: "Waspada jika hujan deras berlangsung lebih dari 2 jam tanpa henti." },
    ],
    tips: "Kesiapsiagaan mengurangi risiko dampak bencana hingga 80%."
  },
  saat: {
    title: "Respon Cepat",
    subtitle: "Tindakan Saat Terjadi Bencana",
    color: "orange",
    icon: <Siren className="text-orange-600" size={32} />,
    steps: [
      { title: "Tetap Tenang", desc: "Jangan panik. Ikuti aba-aba dari pengeras suara masjid atau sirine EWS." },
      { title: "Amankan Aset", desc: "Matikan aliran listrik (MCB) dan lepas selang gas jika sempat." },
      { title: "Prioritas", desc: "Dahulukan evakuasi balita, lansia, dan penyandang disabilitas." },
      { title: "Hindari Titik Rawan", desc: "Jangan melintasi jembatan atau berdiri di bawah tebing saat guncangan/banjir." },
    ],
    tips: "Nyawa adalah prioritas tunggal. Jangan kembali ke rumah untuk mengambil barang."
  },
  pasca: {
    title: "Pemulihan Akhir",
    subtitle: "Penanganan Setelah Situasi Kondusif",
    color: "emerald",
    icon: <HeartHandshake className="text-emerald-600" size={32} />,
    steps: [
      { title: "Cek Kesehatan", desc: "Segera lapor ke posko kesehatan jika ada anggota keluarga yang terluka." },
      { title: "Struktur Bangunan", desc: "Jangan masuk rumah jika ada retakan besar di tembok atau tanah." },
      { title: "Kebersihan", desc: "Waspadai penyakit pasca banjir dengan menggunakan air bersih dari tangki resmi." },
      { title: "Verifikasi Info", desc: "Hanya percaya instruksi dari BPBD atau Pemerintah Desa Sriharjo." },
    ],
    tips: "Tetap di area aman hingga ada pernyataan resmi 'Situasi Kondusif' dari otoritas."
  }
};

// --- KOMPONEN MODAL MODEREN ---
const PanduanModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {
  if (!isOpen || !data) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop dengan Blur */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white"
      >
        {/* Header Decor */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-linear-to-br z-0 opacity-10 ${
          data.color === 'blue' ? 'from-blue-600 to-transparent' : 
          data.color === 'orange' ? 'from-orange-600 to-transparent' : 'from-emerald-600 to-transparent'
        }`} />

        {/* Top Header */}
        <div className="relative p-8 pb-4 flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-lg border border-slate-50 ${
              data.color === 'blue' ? 'text-blue-600' : 
              data.color === 'orange' ? 'text-orange-600' : 'text-emerald-600'
            }`}>
              {data.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">{data.title}</h3>
              <p className="text-sm font-medium text-slate-500">{data.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-all group">
            <X size={20} className="text-slate-500 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Body Scrollable */}
        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar relative">
          <div className="space-y-4 mb-8">
            {data.steps.map((step: any, idx: number) => (
              <div key={idx} className="flex gap-5 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 transition-colors">
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                   data.color === 'blue' ? 'bg-blue-500' : 
                   data.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Box */}
          <div className={`p-6 rounded-4xl border-2 border-dashed flex gap-4 ${
              data.color === 'blue' ? 'bg-blue-50/50 border-blue-100 text-blue-900' : 
              data.color === 'orange' ? 'bg-orange-50/50 border-orange-100 text-orange-900' : 'bg-emerald-50/50 border-emerald-100 text-emerald-900'
          }`}>
            <ShieldAlert size={24} className="shrink-0 opacity-60" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">Rekomendasi Ahli</p>
              <p className="text-sm font-medium leading-relaxed opacity-80">{data.tips}</p>
            </div>
          </div>
          
          {/* Call Center Sticky-like */}
          <div className="mt-8 p-1 bg-slate-50 rounded-4xl border border-slate-100">
            <div className="p-4 bg-slate-900 rounded-[1.75rem] text-white flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Call Center Desa</p>
                  <p className="text-sm font-bold tracking-wider">112 / (0274) Sriharjo</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-bold uppercase">Aktif 24/7</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default function PanduanSection() {
  const [selectedPanduan, setSelectedPanduan] = useState<any>(null);

  const listPanduan = [
    { id: 'pra', ...PANDUAN_CONTENT.pra, delay: 0.1 },
    { id: 'saat', ...PANDUAN_CONTENT.saat, delay: 0.2 },
    { id: 'pasca', ...PANDUAN_CONTENT.pasca, delay: 0.3 },
  ];

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Panduan Kesiapsiagaan</h2>
            <p className="text-slate-500 font-medium text-lg">Protokol keselamatan mandiri bagi warga Desa Sriharjo dalam menghadapi potensi bencana wilayah.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
            <div className="w-4 h-1.5 bg-slate-200 rounded-full" />
            <div className="w-4 h-1.5 bg-slate-200 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listPanduan.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className="group relative p-8 bg-white shadow-xl border border-slate-200 rounded-3xl transition-all duration-50  flex flex-col"
            >
              {/* Decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-tr-3xl rounded-bl-[4rem] opacity-5 transition-all group-hover:w-28 group-hover:h-28 ${
                item.color === 'blue' ? 'bg-blue-600' : 
                item.color === 'orange' ? 'bg-orange-600' : 'bg-emerald-600'
              }`} />

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg ${
                item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                item.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 flex-1">
                Ikuti instruksi taktis langkah demi langkah untuk fase {item.title.toLowerCase()} guna meminimalkan risiko bahaya.
              </p>
              
              <button 
                onClick={() => setSelectedPanduan(item)}
                className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-[#044BB1] hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
              >
                Lihat Protokol <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPanduan && (
          <PanduanModal 
            isOpen={!!selectedPanduan} 
            onClose={() => setSelectedPanduan(null)} 
            data={selectedPanduan} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}