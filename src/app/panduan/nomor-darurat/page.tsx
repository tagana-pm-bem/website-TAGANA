

import { Phone, Flame, HeartPulse, Shield } from "lucide-react";

const contacts = [
  { name: "Panggilan Darurat Umum", num: "112", icon: <Phone />, color: "red", desc: "Polisi, Ambulans, Pemadam (Satu Pintu)" },
  { name: "Pemadam Kebakaran", num: "113", icon: <Flame />, color: "orange", desc: "Penanganan Kebakaran & Penyelamatan" },
  { name: "Ambulans / Medis", num: "118 / 119", icon: <HeartPulse />, color: "green", desc: "Gawat Darurat Kesehatan" },
  { name: "Kepolisian", num: "110", icon: <Shield />, color: "blue", desc: "Bantuan & Keamanan" },
];

export default function NomorDarurat() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Nomor Darurat</h1>
      <p className="text-slate-500 mb-10">Simpan dan hubungi nomor-nomor penting di bawah ini jika Anda menghadapi situasi darurat.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <div key={c.num} className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{c.name}</h3>
                <p className="text-xs text-slate-400">{c.desc}</p>
              </div>
              <div className={`text-${c.color}-500`}>{c.icon}</div>
            </div>
            <span className="text-3xl font-bold text-blue-600 mb-6">{c.num}</span>
            <button className={`w-full py-3 bg-${c.color === 'red' ? 'rose-500' : 'amber-500'} text-white rounded-xl font-bold hover:brightness-95 transition-all`}>
              {c.color === 'red' ? "Panggil Sekarang" : "Panggil"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}