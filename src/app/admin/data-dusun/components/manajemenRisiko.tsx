'use client';

import { useState } from "react";
import { ShieldAlert, Edit3, Save, Loader2, Info, Map } from "lucide-react";
import { useDusun } from "@/hooks/useDusun.hooks"; 
import { bencanaService } from "@/services/bencanaService";
import { dusunService } from "@/services/dusunService";

// SHADCN UI
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

interface ManajemenRisikoProps {
  onSuccess?: () => void;
}

export default function ManajemenRisiko({ onSuccess }: ManajemenRisikoProps) {
  const { data: dusunList } = useDusun(); 
  
  // State Input Risiko
  const [selectedDusunId, setSelectedDusunId] = useState("");
  const [bencana, setBencana] = useState("");
  const [risiko, setRisiko] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



  const bencanaOptions = [
    { label: "Banjir", iconVal: "flood" },
    { label: "Tanah Longsor", iconVal: "landslide" },
    { label: "Kekeringan", iconVal: "drought" },
    { label: "Kebakaran", iconVal: "fire" },
  ];

  const handleSimpan = async () => {
    if (!selectedDusunId || !bencana || !risiko) {
      toast.error("Data Tidak Lengkap", { description: "Mohon lengkapi seluruh data wajib." });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Menyimpan data...");
    
    try {
      const severityMap: {[key: string]: string} = { "Rendah": "low", "Sedang": "medium", "Tinggi": "high" };
      const selectedBencanaOption = bencanaOptions.find(b => b.label === bencana);

      const payload = {
        dusun_id: Number(selectedDusunId),
        jenis_bencana: bencana,
        level_resiko: (severityMap[risiko] || "medium") as "low" | "medium" | "high",
        deskripsi: deskripsi || `Potensi ${bencana} di wilayah ini`,
        icon: selectedBencanaOption?.iconVal || "alert"
      };

      await bencanaService.create(payload);
      toast.success("Data Berhasil Ditambahkan", { id: toastId });
      
      setBencana("");
      setRisiko("");
      setDeskripsi("");
      setSelectedDusunId("");

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Gagal Menyimpan Data", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <Card className="rounded-[2rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
            <ShieldAlert size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-medium tracking-tight text-slate-900">Manajemen Risiko & Wilayah</CardTitle>
            <CardDescription className="font-medium text-slate-500">Pencatatan potensi bencana dan pembaruan informasi profil wilayah desa.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-12">
        {/* SECTION 1: INPUT POTENSI BENCANA */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-4 py-1">
            <h3 className="text-xs font-medium uppercase tracking-widest text-slate-500">Pencatatan Risiko Baru</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5">
              <Label className="font-medium text-slate-700 flex items-center gap-2">
                <Map size={14} className="text-slate-400" /> Dusun Target
              </Label>
              <Select value={selectedDusunId} onValueChange={setSelectedDusunId}>
                <SelectTrigger className="rounded-xl border-slate-200 h-11 focus:ring-blue-100">
                  <SelectValue placeholder="Pilih Dusun" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {(dusunList || []).map(d => (
                    <SelectItem key={d.id} value={d.id.toString()} className="font-medium">{d.nama}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="font-medium text-slate-700 flex items-center gap-2">
                <ShieldAlert size={14} className="text-slate-400" /> Jenis Bencana
              </Label>
              <Select value={bencana} onValueChange={setBencana}>
                <SelectTrigger className="rounded-xl border-slate-200 h-11 focus:ring-blue-100">
                  <SelectValue placeholder="Pilih Bencana" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {bencanaOptions.map(opt => (
                    <SelectItem key={opt.label} value={opt.label} className="font-medium">{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="font-medium text-slate-700 flex items-center gap-2">
                <Info size={14} className="text-slate-400" /> Tingkat Risiko
              </Label>
              <Select value={risiko} onValueChange={setRisiko}>
                <SelectTrigger className="rounded-xl border-slate-200 h-11 focus:ring-blue-100">
                  <SelectValue placeholder="Tingkat Dampak" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Rendah" className="font-medium text-emerald-600">Rendah</SelectItem>
                  <SelectItem value="Sedang" className="font-medium text-amber-600">Sedang</SelectItem>
                  <SelectItem value="Tinggi" className="font-medium text-rose-600">Tinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium text-slate-700">Keterangan Tambahan</Label>
            <Textarea 
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Jelaskan detail potensi ancaman di wilayah ini secara singkat..." 
              className="rounded-xl border-slate-200 resize-none p-4 focus:ring-blue-100 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSimpan}
              disabled={isSubmitting}
              className="bg-[#044BB1] hover:bg-blue-700 text-white px-8 py-6 rounded-2xl font-medium shadow-lg shadow-blue-900/10 gap-2 active:scale-95 transition-all"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Simpan Data Risiko
            </Button>
          </div>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100"></span>
          </div>
        </div>

      
      </CardContent>
    </Card>
  );
}