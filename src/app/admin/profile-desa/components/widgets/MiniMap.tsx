'use client';

import { MapPin, Copy, ExternalLink, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button"; // Import kapital sesuai instruksi
import { toast } from "sonner";

interface MiniMapProps {
  lat: number;
  long: number;
  dusunNama: string;
}

export function MiniMap({ lat, long, dusunNama }: MiniMapProps) {
  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${lat}, ${long}`);
    toast.success("Koordinat Disalin", {
      description: "Titik lokasi berhasil disimpan ke clipboard.",
    });
  };

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-[#044BB1] rounded-xl shadow-sm">
              <MapPin size={18} />
            </div>
            <CardTitle className="text-sm font-medium text-slate-800">Verifikasi Lokasi</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-lg text-slate-400 hover:text-[#044BB1]"
            onClick={copyCoordinates}
          >
            <Copy size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* MAP PLACEHOLDER / INTEGRATION */}
        <div className="relative aspect-video w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden group">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
             <div className="p-4 bg-white rounded-full shadow-md animate-bounce">
                <MapPin size={24} className="text-[#044BB1]" />
             </div>
             <p className="text-[10px] font-medium uppercase tracking-widest">Peta Dusun {dusunNama}</p>
          </div>
          
          {/* Overlay Kontrol */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button size="sm" className="h-8 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white border-none shadow-sm rounded-lg text-[10px] font-medium px-3">
              <ExternalLink size={12} className="mr-2" /> Google Maps
            </Button>
          </div>
        </div>

        {/* KOORDINAT INFO */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Latitude</p>
            <p className="text-xs font-medium text-slate-700">{lat || "0.0000"}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Longitude</p>
            <p className="text-xs font-medium text-slate-700">{long || "0.0000"}</p>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full rounded-xl border-slate-200 font-medium text-slate-600 text-xs gap-2 h-10 hover:bg-blue-50 hover:text-[#044BB1] hover:border-blue-100 transition-all"
        >
          <Navigation size={14} />
          Sesuaikan Titik Koordinat
        </Button>
      </CardContent>
    </Card>
  );
}