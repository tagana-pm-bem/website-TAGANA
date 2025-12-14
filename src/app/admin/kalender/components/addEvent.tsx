"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { CalendarPlus, Save, Loader2 } from "lucide-react";
import ImageUpload from "./imageUpload";
import { eventService } from "@/services/eventService";

interface AddEventProps {
  onSuccess?: () => void;
}

export default function AddEvent({ onSuccess }: AddEventProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState(""); 
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!title || !date || !startTime || !location) {
      alert("Mohon lengkapi Judul, Tanggal, Waktu Mulai, dan Lokasi!");
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = null;
      
      if (selectedFile) {
        imageUrl = await eventService.uploadImage(selectedFile);
      }

      await eventService.create({
        title,
        event_date: date,
        start_time: startTime,
        end_time: endTime || undefined,
        location,
        description,
        image_url: imageUrl || undefined,
        status: "scheduled"
      });

      alert("Event berhasil ditambahkan!");
      
      setTitle("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setLocation("");
      setDescription("");
      setSelectedFile(null); 
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full flex flex-col gap-8 justify-between h-fit">
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-md">Tambah Event Baru</h1>
          <CalendarPlus size={20} color="grey" />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">Judul Event</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Kerja Bakti Masal..."
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-row gap-8 w-full justify-between items-center">
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="font-semibold text-md text-blue-400">Tanggal Event</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full cursor-pointer rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none"
            />
          </div>
          
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="font-semibold text-md text-blue-400">Mulai</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full cursor-pointer rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 items-start w-full">
            <label className="font-semibold text-md text-blue-400">Selesai (Opsional)</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full cursor-pointer rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">Lokasi</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Contoh: Balai Desa"
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-blue-400 font-semibold text-md">Deskripsi Event</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan secara detail kegiatan"
            rows={4}
            className="w-full rounded-xl shadow border border-gray-300 py-2 px-3 text-black focus:border-blue-400 outline-none resize-none"
          />
        </div>

        <ImageUpload onFileSelect={setSelectedFile} />
      </div>

      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="flex flex-row gap-3 items-center justify-center py-3 cursor-pointer rounded-xl bg-blue-400 hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader2 className="animate-spin text-white" size={16} /> : <Save size={16} color="white" />}
        <p className="text-white font-semibold text-sm">{isLoading ? "Menyimpan..." : "Simpan Event"}</p>
      </button>
    </Card>
  );
}