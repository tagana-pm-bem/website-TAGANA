'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { KategoriBeritaService } from "@/services/kategoriBeritaService";

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

  // Ref untuk klik di luar dropdown agar menutup otomatis (Optional UX improvement)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const waktuOptions = [
    'Hari Ini',
    'Minggu Ini',
    'Bulan Ini',
    '3 Bulan Terakhir',
    'Tahun Ini'
  ];

  // 1. Fetch Data Kategori dari Database
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

  // Handle klik luar untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <div ref={dropdownRef} className="w-full bg-white rounded-2xl shadow-[-1px_4px_21px_5px_rgba(17,_12,_46,_0.15)] border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filter Berita</h3>
        {(selectedKategori || selectedWaktu) && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 font-medium hover:text-blue-800"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="space-y-4">
        
        {/* DROPDOWN 1: KATEGORI (Data DB) */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'kategori' ? null : 'kategori')}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <span className={selectedKategori ? 'text-gray-900 font-medium' : 'text-gray-500'}>
              {selectedKategori || 'Pilih Kategori'}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'kategori' ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {openDropdown === 'kategori' && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
              {kategoriOptions.length > 0 ? (
                kategoriOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKategoriChange(item.kategoriBerita)}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      selectedKategori === item.kategoriBerita 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.kategoriBerita}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">Memuat kategori...</div>
              )}
            </div>
          )}
        </div>

        {/* DROPDOWN 2: WAKTU */}
       
      </div>

      {/* Tampilan Chip Filter Aktif */}
      {(selectedKategori || selectedWaktu) && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3 font-medium">Filter Aktif:</p>
          <div className="flex flex-wrap gap-2">
            {selectedKategori && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
                {selectedKategori}
                <button onClick={() => handleKategoriChange('')} className="ml-2 hover:text-blue-900">×</button>
              </span>
            )}
            {selectedWaktu && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                {selectedWaktu}
                <button onClick={() => handleWaktuChange('')} className="ml-2 hover:text-purple-900">×</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBerita;