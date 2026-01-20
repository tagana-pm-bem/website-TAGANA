"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function ZonaBahaya() {
  const handleReset = () => {
    toast.error("Tindakan Dibatalkan", {
      description: "Anda memerlukan otorisasi super-admin untuk mereset sistem."
    });
  };

  return (
    <Card className="border-rose-100 bg-rose-50/30 rounded-[1.5rem] overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 shadow-sm border border-rose-200">
              <AlertTriangle size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-rose-900 tracking-tight">
                  Zona Berbahaya
                </h1>
                <Badge className="bg-rose-500 text-white border-none text-[10px] font-bold px-2 py-0">KRITIS</Badge>
              </div>
              <p className="text-sm font-medium text-rose-700/70 max-w-lg leading-relaxed">
                Tindakan di bawah ini bersifat destruktif dan tidak dapat dibatalkan. 
                Data yang telah dihapus atau sistem yang direset akan hilang selamanya.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleReset}
            className="px-8 py-6 rounded-2xl font-bold text-rose-700 border-rose-200 bg-white hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-sm transition-all active:scale-95 gap-2"
          >
            <RotateCcw size={18} />
            Reset Sistem ke Awal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}