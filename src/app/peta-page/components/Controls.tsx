"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  MapPin,
  Users,
  AlertTriangle,
  CloudRain,
  RefreshCw,
  Info,
  ChevronDown,
  Baby,
  Accessibility,
  User,
  Check,
  Search
} from "lucide-react";

import { dusunService, DusunDetailDB } from "@/services/dusunService";
import { bencanaService, BencanaDB } from "@/services/bencanaService";

const DEFAULT_LAT = -7.942;
const DEFAULT_LNG = 110.395;

interface Props {
  selectedDusunId: number | null;
  onDusunChange: (id: number | null) => void;
  onReset: () => void;
  onOpenInfo: () => void;
}

interface WeatherData {
  temperature: number;
  condition: string;
}

export default function Controls({
  selectedDusunId,
  onDusunChange,
  onReset,
  onOpenInfo,
}: Props) {
  const [dusunList, setDusunList] = useState<{ id: number; nama: string }[]>([]);
  const [dusunDetail, setDusunDetail] = useState<DusunDetailDB | null>(null);
  const [bencanaList, setBencanaList] = useState<BencanaDB[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  
  // State untuk Custom Dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dusunService.getAllNames().then(setDusunList).catch(console.error);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedDusunId) {
      setDusunDetail(null);
      setBencanaList([]);
      return;
    }

    const loadDetail = async () => {
      try {
        setLoadingDetail(true);
        const detail = await dusunService.getDetailById(selectedDusunId);
        setDusunDetail(detail);
        const bencana = await bencanaService.getByDusunId(detail.id);
        setBencanaList(bencana || []);
      } catch (err) {
        console.error("Gagal load detail dusun:", err);
      } finally {
        setLoadingDetail(false);
      }
    };
    loadDetail();
  }, [selectedDusunId]);

  useEffect(() => {
    const loadWeather = async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        );
        const data = await res.json();
        if (data?.current_weather) {
          setWeather({
            temperature: Math.round(data.current_weather.temperature),
            condition: data.current_weather.weathercode > 60 ? "Hujan" : "Cerah / Berawan",
          });
        }
      } catch (err) {
        console.error("Gagal load cuaca:", err);
      }
    };

    if (dusunDetail) {
      loadWeather(dusunDetail.latitude, dusunDetail.longitude);
    } else {
      loadWeather(DEFAULT_LAT, DEFAULT_LNG);
    }
  }, [dusunDetail]);

  const selectedDusunName = dusunList.find(d => d.id === selectedDusunId)?.nama || "Semua Dusun";

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm lg:h-[calc(100vh-4rem)] p-6 bg-white shadow-2xl border-r border-slate-100 overflow-y-auto scrollbar-hide">
      
      {/* ================= HEADER ================= */}
      <div className="relative">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Data Wilayah</h2>
          <button
            onClick={onOpenInfo}
            className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Info size={20} />
          </button>
        </div>
        <p className="text-xs font-medium text-slate-400">Profil dusun & risiko bencana</p>
      </div>

      {/* ================= MODERN CUSTOM DROPDOWN ================= */}
      <div className="space-y-2" ref={dropdownRef}>
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pilih Lokasi</h3>
          {selectedDusunId && (
            <button
              onClick={onReset}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={10} /> RESET
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-300 ${
              isOpen 
              ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10 ring-4 ring-blue-50" 
              : "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${selectedDusunId ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                <MapPin size={16} />
              </div>
              <span className="text-sm font-semibold">{selectedDusunName}</span>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 max-h-64 overflow-y-auto animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => { onDusunChange(null); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <span>Semua Dusun</span>
                {!selectedDusunId && <Check size={16} className="text-blue-600" />}
              </button>
              <div className="h-px bg-slate-100 my-1 mx-2" />
              {dusunList.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { onDusunChange(d.id); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedDusunId === d.id ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span>{d.nama}</span>
                  {selectedDusunId === d.id && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="space-y-4 flex-1">
        {loadingDetail ? (
          <div className="flex items-center gap-2 p-4 text-xs font-semibold text-slate-400 bg-slate-50 rounded-2xl animate-pulse">
            <RefreshCw size={14} className="animate-spin" /> Mengsinkronkan data...
          </div>
        ) : dusunDetail ? (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Stat Cards */}
            {[
              { label: "Penduduk", val: `${dusunDetail.jumlah_penduduk} J`, icon: <Users size={14}/>, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Keluarga", val: `${dusunDetail.jumlah_kk} KK`, icon: <User size={14}/>, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Balita", val: `${dusunDetail.jumlah_balita}`, icon: <Baby size={14}/>, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Disabilitas", val: `${dusunDetail.jumlah_disabilitas}`, icon: <Accessibility size={14}/>, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-white border border-slate-100 rounded-2xl">
                <div className={`w-7 h-7 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                <p className="text-sm font-bold text-slate-900">{stat.val}</p>
              </div>
            ))}
          </div>
        ) : null}

        {/* ================= BENCANA POTENSI ================= */}
        {bencanaList.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-1">Potensi Ancaman</h3>
            {bencanaList.map((b) => (
              <div key={b.id} className="group p-4 rounded-2xl bg-white border border-slate-100 hover:border-amber-200 transition-all">
                <div className="flex gap-4">
                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                    b.level_resiko === "high" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"
                  }`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">{b.jenis_bencana}</p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed italic">"{b.deskripsi}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= WEATHER WIDGET ================= */}
      {weather && (
        <div className="mt-auto bg-[#044BB1] p-5 rounded-3xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">Live Weather</div>
              <CloudRain size={20} className="text-blue-200" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tighter">{weather.temperature}°C</span>
              <span className="text-sm font-semibold opacity-80">{weather.condition}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}