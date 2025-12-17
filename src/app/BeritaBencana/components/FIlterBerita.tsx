'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { KategoriBeritaService } from "@/services/kategoriBeritaService"; // Pastikan path import sesuai

interface FilterBeritaProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  kategori: string;
  waktu: string;
}

const FilterBerita = ({ onFilterChange }: FilterBeritaProps) => {
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedWaktu, setSelectedWaktu] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // State untuk menyimpan opsi kategori dari database
  const [kategoriOptions, setKategoriOptions] = useState<{ id: number; kategoriBerita: string }[]>([]);

  const waktuOptions = [
    'Hari Ini',
    'Minggu Ini',
    'Bulan Ini',
    '3 Bulan Terakhir',
    'Tahun Ini'
  ];

  // Fetch Kategori dari Service saat component di-mount
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const data = await KategoriBeritaService.getAllNames();
        setKategoriOptions(data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  const handleKategoriChange = (kategori: string) => {
    setSelectedKategori(kategori);
    setOpenDropdown(null);
    onFilterChange?.({ kategori, waktu: selectedWaktu });
  };

  const handleWaktuChange = (waktu: string) => {
    setSelectedWaktu(waktu);
    setOpenDropdown(null);
    onFilterChange?.({ kategori: selectedKategori, waktu });
  };

  const handleReset = () => {
    setSelectedKategori('');
    setSelectedWaktu('');
    setOpenDropdown(null);
    onFilterChange?.({ kategori: '', waktu: '' });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[-1px_4px_21px_5px_rgba(17,_12,_46,_0.15)] border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filter Berita</h3>
        {(selectedKategori || selectedWaktu) && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 font-medium"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Kategori Dropdown (Dinamis dari Database) */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'kategori' ? null : 'kategori')}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className={selectedKategori ? 'text-gray-900' : 'text-gray-500'}>
              {selectedKategori || 'Pilih Kategori'}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'kategori' ? 'rotate-180' : ''}`} />
          </button>
          
          {openDropdown === 'kategori' && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
              {kategoriOptions.length > 0 ? (
                kategoriOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKategoriChange(item.kategoriBerita)}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                  >
                    {item.kategoriBerita}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">Memuat kategori...</div>
              )}
            </div>
          )}
        </div>

        {/* Waktu Dropdown */}
        
      </div>

      {/* Active Filters Display */}
      {(selectedKategori || selectedWaktu) && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">Filter Aktif:</p>
          <div className="flex flex-wrap gap-2">
            {selectedKategori && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                {selectedKategori}
              </span>
            )}
            {selectedWaktu && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                {selectedWaktu}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBerita;