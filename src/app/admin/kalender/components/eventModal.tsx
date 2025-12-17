"use client";

import { useState, useEffect } from "react";
import { X, Edit, Trash2, Save, Loader2, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { EventDB } from "@/services/eventService";

// 1. Import Hook SweetAlert
import { useSweetAlert } from "@/components/ui/SweetAlertProvider";

interface EventModalProps {
  event: EventDB;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<EventDB>) => Promise<void>;
}

export default function EventModal({ event, onClose, onDelete, onUpdate }: EventModalProps) {
  // 2. Panggil fungsi dari Provider
  const { 
    confirmDelete, 
    showDraggableSuccess, 
    showDraggableError, 
    showLoading,
    showCenterSuccess, 
    showCenterFailed
    // Jika sudah menambahkan showCenterSuccess di provider, bisa pakai itu. 
    // Jika belum, pakai showDraggableSuccess saja.
  } = useSweetAlert();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState<Partial<EventDB>>({});

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const formatTime = (timeStr: string) => timeStr ? timeStr.slice(0, 5) : "";
  const getFullDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // --- LOGIKA SIMPAN (UPDATE) ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Tampilkan Loading
      showLoading("Menyimpan Perubahan...", "Mohon tunggu sebentar");
      
      // Proses Update ke Database
      await onUpdate(event.id, formData);
      
      // Tampilkan Sukses
      // (Pastikan tidak ada alert() di file parent/induk yang memanggil onUpdate)
      await showCenterSuccess("Data Event Berhasil Diupdate!");
      
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
      showDraggableError("Gagal Update", "Terjadi kesalahan saat menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- LOGIKA HAPUS (DELETE) ---
  const handleDeleteClick = async () => {
    // 1. Konfirmasi
    const result = await confirmDelete(
      "Hapus Event Ini?",
      `Event "${event.title}" akan dihapus permanen.`
    );

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        // 2. Loading
        showLoading("Menghapus...", "Sedang menghapus data dari server");

        // 3. Proses Delete
        await onDelete(event.id);

        // 4. Sukses
        await showCenterSuccess("Event Berhasil Dihapus!");
        
        // 5. Tutup Modal
        onClose(); 
      } catch (error) {
        console.error(error);
        showDraggableError("Gagal Menghapus", "Terjadi kesalahan sistem.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {!isEditing && (
          <div className="relative w-full h-48 bg-gray-200 flex-shrink-0">
            <Image 
              src={event.image_url || "/images/placeholder-news.jpg"} 
              alt={event.title} 
              fill className="object-cover" 
            />
            <button onClick={onClose} className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-md cursor-pointer">
              <X size={20} />
            </button>
          </div>
        )}

        {isEditing ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="font-bold text-gray-800">Edit Event</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer"><X size={20}/></button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Form Input Fields */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Judul</label>
                <input 
                  value={formData.title || ""} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Tanggal</label>
                    <input type="date"
                      value={formData.event_date || ""} 
                      onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <select 
                      value={formData.status || "scheduled"} 
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="scheduled">Terjadwal</option>
                      <option value="completed">Selesai</option>
                      <option value="cancelled">Dibatalkan</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Mulai</label>
                    <input type="time"
                      value={formData.start_time || ""} 
                      onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Selesai</label>
                    <input type="time"
                      value={formData.end_time || ""} 
                      onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                 </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Lokasi</label>
                <input 
                  value={formData.location || ""} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Deskripsi</label>
                <textarea 
                  rows={4}
                  value={formData.description || ""} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>

            {/* Tombol Aksi Edit */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button onClick={() => setIsEditing(false)} className="cursor-pointer flex-1 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Batal</button>
              
              <button 
                onClick={handleSave} 
                disabled={isSaving} 
                className="cursor-pointer flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {/* ICON LOADING DIKEMBALIKAN */}
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Tampilan (Read Only) */}
            <div className="p-6 overflow-y-auto">
              <div className="mb-4">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${event.status === 'completed' ? 'bg-green-100 text-green-700' : event.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {event.status === 'scheduled' ? 'Terjadwal' : event.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                </span>
                <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1">{event.title}</h2>
                <p className="text-sm text-blue-600 font-medium">{getFullDate(event.event_date)}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="text-gray-400 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Waktu</p>
                    <p className="text-sm text-gray-800 font-medium">{formatTime(event.start_time)} - {event.end_time ? formatTime(event.end_time) : "Selesai"} WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="text-gray-400 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Lokasi</p>
                    <p className="text-sm text-gray-800 font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                   <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Deskripsi</p>
                   <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description || "-"}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button onClick={() => setIsEditing(true)} className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100">
                <Edit size={16} /> Edit
              </button>
              
              <button 
                onClick={handleDeleteClick} 
                disabled={isDeleting} 
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-70"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />} 
                Hapus
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}