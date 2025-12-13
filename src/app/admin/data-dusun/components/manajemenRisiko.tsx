"use client";

import { useState } from "react";
import {
  CircleAlert,
  ChevronDown,
  Waves,
  AlertTriangle,
  Mountain,
  Flame,
  Clock,
  ShieldAlert,
  PlusCircle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type OptionItem = {
  label: string;
  color: string;
  icon?: LucideIcon;
};

type DropdownProps = {
  label: string;
  value: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: OptionItem[];
  icon?: LucideIcon;
};

export default function ManajemenRisiko() {
  const [openBencana, setOpenBencana] = useState(false);
  const [openFrekuensi, setOpenFrekuensi] = useState(false);
  const [openRisiko, setOpenRisiko] = useState(false);

  const [bencana, setBencana] = useState("Pilih jenis bencana");
  const [frekuensi, setFrekuensi] = useState("Frekuensi kejadian");
  const [risiko, setRisiko] = useState("Tingkat dampak");

  const [checked, setChecked] = useState(false);

  const bencanaOptions = [
    { label: "Banjir", icon: Waves, color: "text-blue-500" },
    { label: "Gempa Bumi", icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Tanah Longsor", icon: Mountain, color: "text-amber-600" },
    { label: "Kebakaran", icon: Flame, color: "text-red-500" },
  ];

  const frekuensiOptions = [
    { label: "Sering (≥ 1x / bulan)", color: "text-red-500" },
    { label: "Sedang (1–3x / tahun)", color: "text-orange-500" },
    { label: "Jarang (< 1x / tahun)", color: "text-green-600" },
  ];

  const risikoOptions = [
    { label: "Tinggi", color: "text-red-600" },
    { label: "Sedang", color: "text-orange-500" },
    { label: "Rendah", color: "text-green-600" },
  ];

  const Dropdown = ({
    label,
    value,
    open,
    setOpen,
    options,
    icon: Icon,
    setValue,
  }: DropdownProps) => (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-blue-500 font-medium">{label}</label>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-md border border-gray-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} className="text-gray-500" />}
            <span className="text-sm">{value}</span>
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>

        {open && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl p-2 z-30">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  setValue(opt.label);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {opt.icon && <opt.icon size={16} className={opt.color} />}

                <span className={`text-sm font-medium ${opt.color}`}>
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-5">
      {/* HEADER */}
      <div className="flex justify-between items-center py-2">
        <h1 className="font-semibold text-md">
          Manajemen Risiko Bencana: Dusun Krajan Timur
        </h1>

        <div className="flex gap-2 items-center px-3 py-2 rounded-full bg-blue-100">
          <CircleAlert size={18} className="text-blue-500" />
          <span className="text-blue-600 font-semibold text-sm">
            Status Siaga
          </span>
        </div>
      </div>

      <div className="border-b border-gray-300" />

      {/* DESKRIPSI */}
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-md">Input Data Kebencanaan</h2>
        <p className="text-sm text-gray-600">
          Tentukan jenis bencana, frekuensi kejadian, dan tingkat dampaknya.
        </p>
      </div>

      {/* DROPDOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dropdown
          label="Jenis Bencana"
          value={bencana}
          open={openBencana}
          setOpen={setOpenBencana}
          setValue={setBencana}
          options={bencanaOptions}
        />

        <Dropdown
          label="Frekuensi Kejadian"
          value={frekuensi}
          open={openFrekuensi}
          setOpen={setOpenFrekuensi}
          setValue={setFrekuensi}
          options={frekuensiOptions}
          icon={Clock}
        />

        <Dropdown
          label="Tingkat Dampak / Risiko"
          value={risiko}
          open={openRisiko}
          setOpen={setOpenRisiko}
          setValue={setRisiko}
          options={risikoOptions}
          icon={ShieldAlert}
        />
      </div>

      {/* KETERANGAN */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-blue-500 font-medium">Keterangan Tambahan</label>
        <textarea
          placeholder="Masukkan keterangan atau catatan tambahan..."
          className="w-full px-4 py-3 rounded-xl shadow-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>

      <div className="border-b w-full mt-3 border-gray-400" />

      <div className="flex flex-row justify-between items-center">
        <label className="flex flex-row gap-3 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="
            w-5 h-5 cursor-pointer
            accent-blue-500
          "
          />
          <p>Tandai sebagai bencana paling dominan/tertinggi</p>
        </label>

        <button className="flex flex-row gap-3 rounded-xl cursor-pointer hover:bg-blue-500 duration-300 items-center justify-center py-2 px-3 bg-blue-400">
          <PlusCircle size={20} color="white" />
          <h1 className="text-white font-semibold">Tambahkan Data Bencana</h1>
        </button>
      </div>
    </div>
  );
}
