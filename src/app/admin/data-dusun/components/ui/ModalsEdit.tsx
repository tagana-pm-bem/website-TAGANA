"use client";

import React, { useState } from "react";
import { Info, Save, AlertTriangle, Loader2 } from "lucide-react";
import { DisasterDetail } from "@/data/DataBencana";
import { toast } from "sonner"; // Pengganti sweetalert untuk feedback cepat

// SHADCN UI COMPONENTS
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Risiko = "none" | "low" | "medium" | "high";

interface ModalsEditProps {
  disaster: DisasterDetail;
  dusunName: string;
  onClose: () => void;
  onSave: (updatedDisaster: DisasterDetail) => void | Promise<void>;
}

export default function ModalsEdit({
  disaster,
  dusunName,
  onClose,
  onSave,
}: ModalsEditProps) {
  const [formData, setFormData] = useState<DisasterDetail>({ ...disaster });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Validasi awal sebelum memunculkan konfirmasi
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type.trim() || !formData.description.trim()) {
      toast.error("Data Tidak Lengkap", {
        description: "Harap isi jenis bencana dan keterangan mitigasi.",
      });
      return;
    }
    setIsConfirmOpen(true);
  };

  // 2. Eksekusi simpan setelah konfirmasi disetujui
  const handleFinalSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      toast.success("Data Berhasil Diperbarui", {
        description: `Potensi bencana di wilayah ${dusunName} telah dikalibrasi.`,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal Menyimpan", {
        description: "Terjadi gangguan koneksi saat memperbarui data.",
      });
    } finally {
      setIsSaving(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[450px] border-none shadow-2xl rounded-[2rem] p-0 overflow-hidden bg-white">
          {/* HEADER */}
          <DialogHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-[#044BB1] rounded-2xl shadow-sm">
                <Info size={20} />
              </div>
              <div>
                <DialogTitle className="text-xl font-medium text-slate-900">
                  Edit Potensi Bencana
                </DialogTitle>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">
                  Wilayah: {dusunName}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* FORM */}
          <form onSubmit={handlePreSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Jenis Bencana
                </Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="rounded-xl border-slate-200 focus:ring-blue-100 h-11 font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tingkat Risiko
                </Label>
                <Select
                  value={formData.severity}
                  onValueChange={(val: Risiko) => setFormData({ ...formData, severity: val })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 h-11 font-medium focus:ring-blue-100">
                    <SelectValue placeholder="Pilih tingkat risiko" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="none" className="font-medium">Aman / Tidak Ada</SelectItem>
                    <SelectItem value="low" className="font-medium text-blue-600">Risiko Rendah</SelectItem>
                    <SelectItem value="medium" className="font-medium text-amber-600">Risiko Sedang</SelectItem>
                    <SelectItem value="high" className="font-medium text-rose-600">Risiko Tinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Keterangan & Mitigasi
                </Label>
                <Textarea
                  id="desc"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-xl border-slate-200 focus:ring-blue-100 min-h-[100px] font-medium leading-relaxed"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-slate-200 font-medium text-slate-600 h-11 px-6 hover:bg-slate-50"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-[#044BB1] hover:bg-blue-700 font-medium h-11 px-8 shadow-lg shadow-blue-900/10 gap-2"
              >
                <Save size={18} />
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ALERT DIALOG UNTUK KONFIRMASI (Pengganti SweetAlert) */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="rounded-[2rem] border-none p-8 max-w-[400px]">
          <AlertDialogHeader className="space-y-3">
            <div className="mx-auto p-4 bg-amber-50 text-amber-500 rounded-full w-fit">
              <AlertTriangle size={32} />
            </div>
            <AlertDialogTitle className="text-center text-xl font-medium">
              Konfirmasi Perubahan
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-medium text-slate-500">
              Apakah Anda yakin ingin memperbarui data potensi bencana di wilayah <strong>{dusunName}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel className="rounded-xl border-slate-200 font-medium h-11 flex-1">
              Periksa Kembali
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinalSave}
              disabled={isSaving}
              className="rounded-xl bg-[#044BB1] hover:bg-blue-700 font-medium h-11 flex-1 gap-2"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Ya, Simpan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}