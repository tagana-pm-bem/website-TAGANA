"use client";

import { useState } from "react";
import { 
  CalendarPlus, 
  Save, 
  Loader2, 
  Clock, 
  MapPin, 
  FileText, 
  Type 
} from "lucide-react";
import { eventService } from "@/services/eventService";
import { uploadImageByType } from "@/services/fileService"; 
import { getPublicImageUrl } from "@/lib/storage";

// Shadcn UI Imports
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import ImageUpload from "./imageUpload";

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
      toast.error("Data Belum Lengkap", {
        description: "Mohon lengkapi Judul, Tanggal, Waktu Mulai, dan Lokasi!",
      });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sedang menyimpan event...");

    try {
      let imageUrl = null;
      
      if (selectedFile) {
        try {
          const filePath = await uploadImageByType(selectedFile, "events");
          imageUrl = getPublicImageUrl(filePath);
        } catch (uploadError) {
          console.error("Gagal upload gambar event:", uploadError);
          toast.error("Gagal Upload", {
            id: toastId,
            description: "Gagal mengupload gambar poster event.",
          });
          setIsLoading(false);
          return;
        }
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

      toast.success("Berhasil!", {
        id: toastId,
        description: "Event baru telah berhasil ditambahkan ke kalender.",
      });
      
      // Reset Form
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
      toast.error("Gagal Menyimpan", {
        id: toastId,
        description: "Terjadi kesalahan sistem saat menyimpan event.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl font-medium text-slate-900">Tambah Event Baru</CardTitle>
            <CardDescription className="font-medium text-slate-500">
              Publikasikan agenda kegiatan desa mendatang.
            </CardDescription>
          </div>
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#044BB1]">
            <CalendarPlus size={24} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-7">
        {/* Judul Event */}
        <div className="space-y-2">
          <Label htmlFor="title" className="flex items-center gap-2 font-bold text-slate-700">
            <Type size={16} className="text-[#044BB1]" /> Judul Event
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Kerja Bakti Masal..."
            className="rounded-xl border-slate-200 focus:ring-[#044BB1]"
          />
        </div>

        {/* Waktu & Tanggal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-bold text-slate-700">
              <CalendarPlus size={16} className="text-[#044BB1]" /> Tanggal
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl border-slate-200 cursor-pointer"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-bold text-slate-700">
              <Clock size={16} className="text-[#044BB1]" /> Mulai
            </Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-xl border-slate-200 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-bold text-slate-700 opacity-60">
              <Clock size={16} /> Selesai (Ops)
            </Label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-xl border-slate-200 cursor-pointer"
            />
          </div>
        </div>

        {/* Lokasi */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 font-bold text-slate-700">
            <MapPin size={16} className="text-[#044BB1]" /> Lokasi Kegiatan
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Contoh: Balai Desa Sriharjo"
            className="rounded-xl border-slate-200"
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2 font-bold text-slate-700">
            <FileText size={16} className="text-[#044BB1]" /> Deskripsi Event
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan secara detail mengenai agenda kegiatan..."
            rows={4}
            className="rounded-xl border-slate-200 resize-none"
          />
        </div>

        {/* Upload Gambar */}
        <div className="pt-2">
          <ImageUpload onFileSelect={setSelectedFile} />
        </div>

        {/* Tombol Simpan */}
        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-7 rounded-2xl bg-[#044BB1] hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10 font-bold text-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Menyimpan Event...
            </>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              Simpan Agenda Event
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}