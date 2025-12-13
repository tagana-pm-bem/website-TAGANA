import Card from "@/components/ui/card";
import { CalendarPlus, Save } from "lucide-react";
import ImageUpload from "./imageUpload";

export default function AddEvent() {
  return (
    <Card className="w-full flex flex-col gap-8 justify-between">
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-md">Tambah Event Baru</h1>
          <CalendarPlus size={20} color="grey" />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">
            Judul Event
          </label>
          <input
            placeholder="Contoh: Kerja Bakti Masal..."
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-200"
          />
        </div>

        <div className="flex flex-row gap-8 w-full justify-between items-center">
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="font-semibold text-md text-blue-400">
              Tanggal Event
            </label>
            <input
              type="date"
              className="w-full cursor-pointer rounded-xl shadow border border-gray-300 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="font-semibold text-md text-blue-400">Waktu</label>
            <input
              type="time"
              className="w-full cursor-pointer rounded-xl shadow border border-gray-300 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-200"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">Lokasi</label>
          <input
            placeholder="Contoh: Balai Desa."
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-200"
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">
            Deskripsi Event
          </label>
          <textarea
            placeholder="Jelaskan secara detail kegiatan"
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 placeholder:text-black/20 placeholder:text-sm placeholder:text-normal text-black focus:border-gray-200"
          />
        </div>

        <ImageUpload />
      </div>

      <button className="flex flex-row gap-3 items-center justify-center py-3 cursor-pointer rounded-xl bg-blue-400 hover:bg-blue-500 transition-all duration-300">
        <Save size={16} color="white" />
        <p className="text-white font-semibold text-sm">Simpan Event</p>
      </button>
    </Card>
  );
}
