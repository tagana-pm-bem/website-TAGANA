'use client';

import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDusun } from '@/hooks/useDusun.hooks'; 

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

interface AddActionPendudukProps {
  onClose?: () => void;
}

export default function AddActionPenduduk({ onClose }: AddActionPendudukProps) {
  const { data: dusunList, updateDusunStats, isLoading } = useDusun();
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; title: string; message: string } | null>(null);
  const [pendudukForm, setPendudukForm] = useState({
    dusun: '',
    jumlahKK: '',
    jumlahLakiLaki: '',
    jumlahPerempuan: '',
    jumlahBalita: '',
    jumlahLansia: '',
    jumlahIbuHamil: '',
    jumlahPenyandangDisabilitas: '',
    jumlahPendudukMiskin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePendudukSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pendudukForm.dusun) {
      setAlert({
        type: 'error',
        title: 'Gagal Menyimpan',
        message: 'Pilih dusun terlebih dahulu'
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      const targetDusun = dusunList.find(
        (d) => d.nama.toLowerCase() === pendudukForm.dusun.toLowerCase()
      );

      if (!targetDusun) {
        throw new Error('Data dusun tidak ditemukan di database');
      }

      const payload = {
        jumlah_kk: Number(pendudukForm.jumlahKK),
        jumlah_laki_laki: Number(pendudukForm.jumlahLakiLaki),
        jumlah_perempuan: Number(pendudukForm.jumlahPerempuan),
        jumlah_balita: Number(pendudukForm.jumlahBalita),
        jumlah_lansia: Number(pendudukForm.jumlahLansia),
        jumlah_ibu_hamil: Number(pendudukForm.jumlahIbuHamil),
        jumlah_disabilitas: Number(pendudukForm.jumlahPenyandangDisabilitas),
        jumlah_miskin: Number(pendudukForm.jumlahPendudukMiskin)
      };

      const success = await updateDusunStats(targetDusun.id, payload);

      if (success) {
        setAlert({
          type: 'success',
          title: 'Berhasil',
          message: 'Data penduduk berhasil disimpan'
        });
        
        setPendudukForm({
          dusun: '',
          jumlahKK: '',
          jumlahLakiLaki: '',
          jumlahPerempuan: '',
          jumlahBalita: '',
          jumlahLansia: '',
          jumlahIbuHamil: '',
          jumlahPenyandangDisabilitas: '',
          jumlahPendudukMiskin: ''
        });
        
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      }

    } catch (error) {
      console.error(error);
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'Terjadi kesalahan saat menyimpan data'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Input Data Statistik Penduduk</h3>
      
      {alert && (
        <Alert variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-6">
          {alert.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handlePendudukSubmit} className="space-y-6">
        {/* Pilih Dusun */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pilih Dusun
          </label>
          <select
            value={pendudukForm.dusun}
            onChange={(e) => setPendudukForm({ ...pendudukForm, dusun: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            disabled={isLoading || isSubmitting}
          >
            <option value="">-- Pilih Dusun --</option>
            {DUSUN_LIST.map((dusun) => (
              <option key={dusun} value={dusun}>{dusun}</option>
            ))}
          </select>
        </div>

        {/* Form Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Kelompok Umum */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-500 border-b pb-2">Data Umum</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah KK</label>
              <input
                type="number"
                value={pendudukForm.jumlahKK}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahKK: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Laki-laki</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahLakiLaki}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahLakiLaki: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perempuan</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahPerempuan}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPerempuan: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Kelompok Rentan */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-500 border-b pb-2">Data Kelompok Rentan</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Balita</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahBalita}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahBalita: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lansia</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahLansia}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahLansia: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ibu Hamil</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahIbuHamil}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahIbuHamil: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disabilitas</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahPenyandangDisabilitas}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPenyandangDisabilitas: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Penduduk Miskin</label>
                <input
                  type="number"
                  value={pendudukForm.jumlahPendudukMiskin}
                  onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPendudukMiskin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            type="button"
            onClick={() => setPendudukForm({
              dusun: '', jumlahKK: '', jumlahLakiLaki: '', jumlahPerempuan: '',
              jumlahBalita: '', jumlahLansia: '', jumlahIbuHamil: '',
              jumlahPenyandangDisabilitas: '', jumlahPendudukMiskin: ''
            })}
            className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Data Penduduk'}
          </button>
        </div>
      </form>
    </div>
  );
}