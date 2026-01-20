"use client";

import { motion } from "framer-motion";

export default function LegendCard() {
  const legends = [
    {
      icon: <div className="w-5 h-5 rounded-md bg-orange-500 shadow-sm" />, // Ukuran ikon 6->5
      title: "Titik Pantau Banjir",
      description: "Lokasi pengamatan banjir",
    },
    {
      icon: <div className="w-5 h-5 rounded-full bg-sky-500" />,
      title: "Penanda Lokasi Dusun",
      description: "Titik pusat atau kantor dusun",
    },
    {
      icon: <div className="w-5 h-5 rounded-md bg-red-400 shadow-sm" />,
      title: "Zona Banjir",
      description: "Area rawan banjir",
    },
    {
      icon: <div className="w-5 h-5 rounded border-2 border-slate-500 bg-transparent" />,
      title: "Batas RT",
      description: "Garis batas wilayah dusun",
    },
    {
      icon: (
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 border-x-2 border-y-2 border-dashed border-slate-400 rounded-sm" />
          <div className="absolute inset-y-1 inset-x-0 bg-white" />
        </div>
      ),
      title: "Batas Dusun",
      description: "Garis batas Rukun Tetangga",
    },
    {
      icon: <div className="w-7 h-1 bg-yellow-400 rounded-full" />,
      title: "Jalan",
      description: "Jalur jalan utama",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="w-full max-w-[320px] bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 leading-tight mb-3 tracking-tight">
          Legenda Peta
        </h2>
        <p className="text-xs leading-relaxed text-slate-400 font-medium">
          Simbol untuk menandai area rawan, batas wilayah, dan jalan.
        </p>
      </motion.div>

      <div className="space-y-5">
        {legends.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="flex items-start gap-4 group cursor-default"
          >
            <div className="flex items-center justify-center w-6 h-6 shrink-0">
              {item.icon}
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-bold text-[#006341] tracking-tight group-hover:text-blue-600 transition-colors">
                {item.title}
              </p>
              <p className="text-[11px] font-medium text-slate-400 leading-tight">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}