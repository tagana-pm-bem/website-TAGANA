'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/card';
import { useAlert } from '@/components/ui/Alert';

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

interface AddActionRTProps {
  onClose?: () => void;
}

export default function AddActionRT({ onClose }: AddActionRTProps) {
  const { showAlert } = useAlert();

  const [rtForm, setRtForm] = useState({
    dusun: '',
    rt: '',
    nama: '',
    jenisKelamin: ''
  });

  const handleRtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rtForm.dusun || !rtForm.rt || !rtForm.nama) {
      showAlert({
        type: 'error',
        title: 'Gagal Menyimpan',
        message: 'Mohon lengkapi semua field yang wajib diisi'
      });
      return;
    }

    console.log('RT Data:', rtForm);
    showAlert({
      type: 'success',
      title: 'Data Berhasil Disimpan',
      message: `Data RT ${rtForm.rt} - Dusun ${rtForm.dusun} berhasil ditambahkan`
    });
    
    setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' });
    
    // Close modal after successful submission
    setTimeout(() => {
      onClose?.();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Data RT</h2>
        
        <form onSubmit={handleRtSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dusun <span className="text-red-500">*</span>
            </label>
            <select
              value={rtForm.dusun}
              onChange={(e) => setRtForm({ ...rtForm, dusun: e.target.value })}
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
                RT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={rtForm.rt}
                onChange={(e) => setRtForm({ ...rtForm, rt: e.target.value })}
                placeholder="Contoh: 001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Kepala RT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={rtForm.nama}
                onChange={(e) => setRtForm({ ...rtForm, nama: e.target.value })}
                placeholder="Nama lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <select
              value={rtForm.jenisKelamin}
              onChange={(e) => setRtForm({ ...rtForm, jenisKelamin: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' })}
              className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-400 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan Data RT
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
