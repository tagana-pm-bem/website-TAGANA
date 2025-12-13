"use client";

import { useState } from "react";
import { Map, Plus, ChevronDown, Search } from "lucide-react";

export default function PetaWilayah() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Pilih Lokasi");

  const options = [
  "Miri",
  "Jati",
  "Mojohuro",
  "Pelemadu",
  "Sungapan",
  "Gondosuli",
  "Trukan",
  "Dogongan",
  "Ketos",
  "Ngrancah",
  "Pengkol",
  "Sompok",
  "Wunut"
];


  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-md font-semibold text-blue-400">
        Pilih Wilayah Dusun
      </h1>

      <div className="flex flex-row justify-between items-center w-full">
        <div className="relative flex items-center w-1/2">
          <Map size={18} className="absolute left-3 text-black" />

          <div
            onClick={() => setOpen(!open)}
            className="w-full bg-white pl-10 pr-3 py-3 shadow-md rounded-xl text-sm cursor-pointer border border-gray-300 flex items-center justify-between"
          >
            <span>{selected}</span>
            <ChevronDown
              size={18}
              className={`transition-all ${open ? "rotate-180" : ""}`}
            />
          </div>

          {open && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl p-2 z-20 max-h-48 overflow-y-auto">
              {options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-3 items-center w-1/2 justify-end">
          <button className="flex flex-row gap-2 justify-center items-center shadow-md cursor-pointer bg-white hover:bg-gray-200 transition-all duration-300 border py-2 px-3 rounded-xl border-blue-400 min-w-20">
            <Plus size={16} className="text-blue-400" />
            <p className="text-blue-400 font-semibold">Tambah Dusun</p>
          </button>

          <button className="flex flex-row gap-2 justify-center items-center bg-blue-400 cursor-pointer hover:bg-blue-500 transition-all duration-300 shadow-md py-2 px-3 rounded-xl min-w-20">
            <Search size={16} className="text-white" />
            <p className="text-white font-semibold">Tampilkan Data</p>
          </button>
        </div>
      </div>
    </div>
  );
}
