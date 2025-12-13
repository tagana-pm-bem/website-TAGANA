import Card from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function ZonaBahaya() {
  return (
    <Card className="border border-red-300 bg-red-300">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-600 mt-0.5" size={20} />
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold text-red-700">
              Zona Berbahaya
            </h1>
            <p className="text-xs text-red-600">
              Tindakan ini tidak dapat dibatalkan. Harap berhati-hati.
            </p>
          </div>
        </div>

        <button
          className="
            px-4 py-2
            rounded-lg
            text-sm font-semibold
            text-red-700
            border border-red-400
            bg-white
            hover:bg-red-600 hover:text-white
            transition cursor-pointer
          "
        >
          Reset Sistem ke Awal
        </button>
      </div>
    </Card>
  );
}
