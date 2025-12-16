'use client';

import { useState } from "react";
import { ShieldAlert, Edit3 } from "lucide-react";
import { useDusun } from "@/hooks/useDusun.hooks"; 
import { bencanaService } from "@/services/bencanaService";
import { dusunService } from "@/services/dusunService";
import { useAlert } from "@/components/ui/Alert";
import Dropdown from "./dropdown";

export default function ManajemenRisiko() {
  const { showAlert } = useAlert();
  const { data: dusunList } = useDusun(); 

  const [selectedDusunId, setSelectedDusunId] = useState("");
  const [bencana, setBencana] = useState("Pilih jenis bencana");
  const [risiko, setRisiko] = useState("Tingkat dampak");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Edit Deskripsi Dusun
  const [selectedDusunForEdit, setSelectedDusunForEdit] = useState("");
  const [deskripsiDusun, setDeskripsiDusun] = useState("");
  const [isUpdatingDeskripsi, setIsUpdatingDeskripsi] = useState(false);

  const bencanaOptions = [
    { label: "Banjir", color: "text-blue-500", iconVal: "flood" },
    { label: "Tanah Longsor", color: "text-amber-700", iconVal: "landslide" },
    { label: "Gempa Bumi", color: "text-red-500", iconVal: "earthquake" },
    { label: "Angin Puting Beliung", color: "text-gray-500", iconVal: "wind" },
    { label: "Kekeringan", color: "text-orange-500", iconVal: "drought" },
    { label: "Kebakaran", color: "text-red-600", iconVal: "fire" },
  ];

  const risikoOptions = [
    { label: "Rendah", color: "text-green-500" }, 
    { label: "Sedang", color: "text-yellow-500" }, 
    { label: "Tinggi", color: "text-red-500" }, 
  ];

  const handleSimpan = async () => {
    if (!selectedDusunId || bencana === "Pilih jenis bencana" || risiko === "Tingkat dampak") {
      showAlert({ type: 'error', title: 'Gagal', message: 'Mohon lengkapi semua data (Dusun, Bencana, Risiko)' });
      return;
    }

    setIsSubmitting(true);
    try {
      const severityMap: {[key: string]: string} = { "Rendah": "low", "Sedang": "medium", "Tinggi": "high" };
      
      const selectedBencanaOption = bencanaOptions.find(b => b.label === bencana);
      const iconOtomatis = selectedBencanaOption?.iconVal || "alert";

      const payload = {
        dusun_id: Number(selectedDusunId),
        jenis_bencana: bencana,
        level_resiko: (severityMap[risiko] || "medium") as "low" | "medium" | "high",
        deskripsi: deskripsi || `Potensi ${bencana} di wilayah ini`,
        icon: iconOtomatis 
      };

      await bencanaService.create(payload);

      showAlert({ type: 'success', title: 'Berhasil', message: 'Data risiko bencana berhasil ditambahkan' });
      setBencana("Pilih jenis bencana");
      setRisiko("Tingkat dampak");
      setDeskripsi("");
      setSelectedDusunId("");
      
      window.location.reload(); 

    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal menyimpan data' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Update Deskripsi Dusun
  const handleUpdateDeskripsiDusun = async () => {
    if (!selectedDusunForEdit) {
      showAlert({ type: 'error', title: 'Gagal', message: 'Pilih dusun terlebih dahulu' });
      return;
    }

    if (!deskripsiDusun.trim()) {
      showAlert({ type: 'error', title: 'Gagal', message: 'Deskripsi tidak boleh kosong' });
      return;
    }

    setIsUpdatingDeskripsi(true);
    try {
      const selectedDusun = dusunList?.find(d => d.id === Number(selectedDusunForEdit));
      
      if (!selectedDusun) {
        throw new Error("Dusun tidak ditemukan");
      }

      await dusunService.updateStats(Number(selectedDusunForEdit), {
        deskripsi: deskripsiDusun
      });

      showAlert({ type: 'success', title: 'Berhasil', message: 'Deskripsi dusun berhasil diperbarui' });
      setSelectedDusunForEdit("");
      setDeskripsiDusun("");
      
      window.location.reload();

    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal memperbarui deskripsi dusun' });
    } finally {
      setIsUpdatingDeskripsi(false);
    }
  };

  // Handle perubahan dusun terpilih untuk edit
  const handleDusunChangeForEdit = (dusunId: string) => {
    setSelectedDusunForEdit(dusunId);
    const selectedDusun = dusunList?.find(d => d.id === Number(dusunId));
    setDeskripsiDusun(selectedDusun?.deskripsi || "");
  };

  const [openBencana, setOpenBencana] = useState(false);
  const [openRisiko, setOpenRisiko] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Card 1: Input Manajemen Risiko */}
      <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-500" />
          Input Manajemen Risiko
        </h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Pilih Dusun</label>
          <select 
            value={selectedDusunId}
            onChange={(e) => setSelectedDusunId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">-- Pilih Dusun Target --</option>
            {(dusunList || []).map(d => (
              <option key={d.id} value={d.id}>{d.nama}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            label="Jenis Bencana"
            value={bencana}
            open={openBencana}
            setOpen={setOpenBencana}
            setValue={setBencana}
            options={bencanaOptions}
            icon={ShieldAlert}
          />

          <Dropdown
            label="Tingkat Risiko"
            value={risiko}
            open={openRisiko}
            setOpen={setOpenRisiko}
            setValue={setRisiko}
            options={risikoOptions}
            icon={ShieldAlert}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-gray-600">Keterangan Tambahan</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Masukkan keterangan detail potensi bencana..."
            className="w-full px-4 py-3 rounded-xl shadow-sm border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        <div className="border-b w-full mt-2 border-gray-200" />

        <div className="flex justify-end">
          <button 
            onClick={handleSimpan}
            disabled={isSubmitting}
            className="flex flex-row gap-3 rounded-xl cursor-pointer bg-blue-500 hover:bg-blue-600 duration-300 transition-all text-white font-semibold py-3 px-6 shadow-md shadow-blue-200 disabled:bg-gray-400"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Data Risiko"}
          </button>
        </div>
      </div>

      {/* Card 2: Edit Deskripsi Dusun */}
      <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-green-500" />
          Edit Deskripsi Dusun
        </h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Pilih Dusun</label>
          <select 
            value={selectedDusunForEdit}
            onChange={(e) => handleDusunChangeForEdit(e.target.value)}
            className="w-full px-4 py-3 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          >
            <option value="">-- Pilih Dusun untuk Edit --</option>
            {(dusunList || []).map(d => (
              <option key={d.id} value={d.id}>{d.nama}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-gray-600">Deskripsi Dusun</label>
          <textarea
            value={deskripsiDusun}
            onChange={(e) => setDeskripsiDusun(e.target.value)}
            placeholder="Masukkan deskripsi dusun..."
            className="w-full px-4 py-3 rounded-xl shadow-sm border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
            disabled={!selectedDusunForEdit}
          />
        </div>

        <div className="border-b w-full mt-2 border-gray-200" />

        <div className="flex justify-end">
          <button 
            onClick={handleUpdateDeskripsiDusun}
            disabled={isUpdatingDeskripsi || !selectedDusunForEdit}
            className="flex flex-row gap-3 rounded-xl cursor-pointer bg-green-500 hover:bg-green-600 duration-300 transition-all text-white font-semibold py-3 px-6 shadow-md shadow-green-200 disabled:bg-gray-400"
          >
            {isUpdatingDeskripsi ? "Menyimpan..." : "Update Deskripsi"}
          </button>
        </div>
      </div>
    </div>
  );
}