'use client';

import React, { useState } from 'react';
// Pastikan komponen-komponen ini sudah di-install via npx shadcn-ui@latest add ...
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner'; // Atau gunakan useToast dari shadcn
import { useDusun } from '@/hooks/useDusun.hooks';
import { rtService } from '@/services/rtService';
import { Loader2, RotateCcw, Save } from 'lucide-react';

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

interface AddActionRTProps {
  onClose?: () => void;
}

export default function AddActionRT({ onClose }: AddActionRTProps) {
  const { data: dusunList, isLoading: isDusunLoading } = useDusun();

  const [rtForm, setRtForm] = useState({
    dusun: '',
    rt: '',
    nama: '',
    jenisKelamin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rtForm.dusun || !rtForm.rt || !rtForm.nama) {
      toast.error('Gagal', {
        description: 'Lengkapi data wajib (Dusun, RT, dan Nama Ketua)!',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const targetDusun = dusunList?.find(
        (d: any) => d.nama.toLowerCase() === rtForm.dusun.toLowerCase()
      );

      if (!targetDusun) throw new Error("Dusun tidak ditemukan");

      const payload = {
        dusun_id: targetDusun.id,
        nomor_rt: rtForm.rt,
        nama_ketua: rtForm.nama,
        jenis_kelamin_ketua: rtForm.jenisKelamin || null
      };

      await rtService.create(payload);

      toast.success('Berhasil', {
        description: `RT ${rtForm.rt} di ${rtForm.dusun} berhasil ditambahkan`,
      });

      setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' });
      if (onClose) onClose();

    } catch (error) {
      console.error(error);
      toast.error('Error', {
        description: 'Gagal menyimpan data RT. Silakan coba lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Tambah Data RT</h3>
        <p className="text-sm text-muted-foreground mt-1">Masukkan informasi ketua RT baru di wilayah dusun.</p>
      </div>
      
      <form onSubmit={handleRtSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dusun Select */}
          <div className="space-y-2">
            <Label htmlFor="dusun" className="font-bold">Dusun</Label>
            <Select 
              value={rtForm.dusun} 
              onValueChange={(value) => setRtForm({ ...rtForm, dusun: value })}
              disabled={isDusunLoading}
            >
              <SelectTrigger id="dusun" className="rounded-xl border-slate-200">
                <SelectValue placeholder="Pilih Dusun" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {DUSUN_LIST.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nomor RT */}
          <div className="space-y-2">
            <Label htmlFor="rt" className="font-bold">Nomor RT</Label>
            <Input
              id="rt"
              type="text"
              value={rtForm.rt}
              onChange={(e) => setRtForm({ ...rtForm, rt: e.target.value })}
              placeholder="Contoh: 001"
              className="rounded-xl border-slate-200 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Nama Ketua RT */}
        <div className="space-y-2">
          <Label htmlFor="nama" className="font-bold">Nama Ketua RT</Label>
          <Input
            id="nama"
            type="text"
            value={rtForm.nama}
            onChange={(e) => setRtForm({ ...rtForm, nama: e.target.value })}
            placeholder="Nama Lengkap Tanpa Gelar"
            className="rounded-xl border-slate-200"
          />
        </div>

        {/* Jenis Kelamin Ketua */}
        <div className="space-y-2">
          <Label htmlFor="jenisKelamin" className="font-bold">Jenis Kelamin Ketua</Label>
          <Select 
            value={rtForm.jenisKelamin} 
            onValueChange={(value) => setRtForm({ ...rtForm, jenisKelamin: value })}
          >
            <SelectTrigger id="jenisKelamin" className="rounded-xl border-slate-200">
              <SelectValue placeholder="Pilih Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="L">Laki-laki</SelectItem>
              <SelectItem value="P">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="rounded-xl border-slate-200 px-6 font-bold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#044BB1] hover:bg-blue-700 px-6 font-bold shadow-lg shadow-blue-900/10"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Data RT
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}