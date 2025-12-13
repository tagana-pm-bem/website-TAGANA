'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/card';
import { useAlert } from '@/components/ui/Alert';

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

interface AddActionPendudukProps {
  onClose?: () => void;
}

export default function AddActionPenduduk({ onClose }: AddActionPendudukProps) {
  const { showAlert } = useAlert();

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

  const handlePendudukSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pendudukForm.dusun) {
      showAlert({
        type: 'error',
        title: 'Gagal Menyimpan',
        message: 'Pilih dusun terlebih dahulu'
      });
      return;
    }

    console.log('Population Data:', pendudukForm);
    showAlert({
      type: 'success',
      title: 'Data Berhasil Disimpan',
      message: `Data penduduk Dusun ${pendudukForm.dusun} berhasil diperbarui`
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

    // Close modal after successful submission
    setTimeout(() => {
      onClose?.();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Data Penduduk</h2>
        
        <form onSubmit={handlePendudukSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dusun <span className="text-red-500">*</span>
            </label>
            <select
              value={pendudukForm.dusun}
              onChange={(e) => setPendudukForm({ ...pendudukForm, dusun: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Dusun</option>
              {DUSUN_LIST.map((dusun) => (
                <option key={dusun} value={dusun}>{dusun}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah KK
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahKK}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahKK: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Laki-Laki
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahLakiLaki}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahLakiLaki: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Perempuan
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahPerempuan}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPerempuan: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Balita
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahBalita}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahBalita: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Lansia
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahLansia}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahLansia: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Ibu Hamil
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahIbuHamil}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahIbuHamil: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Penyandang Disabilitas
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahPenyandangDisabilitas}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPenyandangDisabilitas: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Penduduk Miskin
              </label>
              <input
                type="number"
                value={pendudukForm.jumlahPendudukMiskin}
                onChange={(e) => setPendudukForm({ ...pendudukForm, jumlahPendudukMiskin: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setPendudukForm({
                dusun: '',
                jumlahKK: '',
                jumlahLakiLaki: '',
                jumlahPerempuan: '',
                jumlahBalita: '',
                jumlahLansia: '',
                jumlahIbuHamil: '',
                jumlahPenyandangDisabilitas: '',
                jumlahPendudukMiskin: ''
              })}
              className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan Data Penduduk
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
