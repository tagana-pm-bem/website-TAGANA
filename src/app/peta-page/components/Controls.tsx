"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Users,
  AlertTriangle,
  CloudRain,
  RefreshCw,
  Info,
  Baby,
  Accessibility,
  User,
} from "lucide-react";

import { dusunService, DusunDetailDB } from "@/services/dusunService";
import { bencanaService, BencanaDB } from "@/services/bencanaService";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  useEffect(() => {
    dusunService.getAllNames().then(setDusunList).catch(console.error);
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

  return (
    <div className="flex fixed flex-col gap-4 md:gap-6 w-full max-w-sm max-h-screen rounded-2xl p-4 md:p-6 bg-white shadow-2xl border-r border-slate-100 overflow-y-auto scrollbar-hide">
      
      {/* ================= HEADER ================= */}
      <div className="relative">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">Data Wilayah</h2>
          <Button
            onClick={onOpenInfo}
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <Info className="h-8 w-8 md:h-10 md:w-10" />
          </Button>
        </div>
        <p className="text-[11px] md:text-lg font-light text-slate-400">Profil dusun & risiko bencana</p>
      </div>

      {/* ================= SHADCN SELECT DROPDOWN ================= */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <Badge variant="outline" className="text-[10px] font-bold border-gray-300 uppercase tracking-widest">
            Pilih Lokasi
          </Badge>
          {selectedDusunId && (
            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] font-bold gap-1"
            >
              <RefreshCw className="h-3 w-3" /> RESET
            </Button>
          )}
        </div>

        <Select
          value={selectedDusunId?.toString() || "all"}
          onValueChange={(value) => onDusunChange(value === "all" ? null : parseInt(value))}
        >
          <SelectTrigger className="w-full h-12 md:h-14 rounded-xl md:rounded-lg ">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`p-1 md:p-1.5 rounded-lg ${selectedDusunId ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"}`}>
              </div>
              <SelectValue placeholder="Semua Dusun" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Dusun</SelectItem>
            {dusunList.map((d) => (
              <SelectItem key={d.id} value={d.id.toString()}>
                {d.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="space-y-3 md:space-y-4 flex-1">
        {loadingDetail ? (
          <Card>
            <CardContent className="flex items-center gap-2 p-4">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-xs font-semibold text-muted-foreground">Mengsinkronkan data...</span>
            </CardContent>
          </Card>
        ) : dusunDetail ? (
          <div className="grid grid-cols-2 gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Stat Cards */}
            {[
              { label: "Penduduk", val: `${dusunDetail.jumlah_penduduk} J`, icon: <Users className="h-3.5 w-3.5"/>, variant: "default" as const },
              { label: "Keluarga", val: `${dusunDetail.jumlah_kk} KK`, icon: <User className="h-3.5 w-3.5"/>, variant: "secondary" as const },
              { label: "Balita", val: `${dusunDetail.jumlah_balita}`, icon: <Baby className="h-3.5 w-3.5"/>, variant: "outline" as const },
              { label: "Disabilitas", val: `${dusunDetail.jumlah_disabilitas}`, icon: <Accessibility className="h-3.5 w-3.5"/>, variant: "outline" as const },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-2.5 md:p-3">
                  <Badge variant={stat.variant} className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center mb-1.5 md:mb-2 p-0">
                    {stat.icon}
                  </Badge>
                  <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{stat.label}</p>
                  <p className="text-xs md:text-sm font-bold">{stat.val}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {/* ================= BENCANA POTENSI ================= */}
        {bencanaList.length > 0 && (
          <div className="space-y-2 md:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">
              Potensi Ancaman
            </Badge>
            {bencanaList.map((b) => (
              <Card key={b.id} className="hover:border-amber-200 transition-all">
                <CardContent className="p-3 md:p-4">
                  <div className="flex gap-3 md:gap-4">
                    <div className={`mt-0.5 md:mt-1 p-2 md:p-2.5 rounded-lg shrink-0 ${
                      b.level_resiko === "high" 
                        ? "bg-red-50 text-red-500" 
                        : b.level_resiko === "medium"
                        ? "bg-orange-50 text-orange-500"
                        : "bg-yellow-50 text-yellow-500"
                    }`}>
                      <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-bold mb-0.5 md:mb-1">{b.jenis_bencana}</p>
                      <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed italic">"{b.deskripsi}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ================= WEATHER WIDGET ================= */}
      {weather && (
        <Card className="mt-auto bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 border-0 text-white shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border-0">
          Cuaca Terkini
              </Badge>
              <CloudRain className="h-4 w-4 md:h-5 md:w-5 text-blue-100/80" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-bold">{weather.temperature}°</span>
              <span className="text-sm md:text-base font-medium text-blue-50">{weather.condition}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}