'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterBeritaProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  kategori: string;
  subKategori: string;
  waktu: string;
}

const FilterBerita = ({ onFilterChange }: FilterBeritaProps) => {
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedSubKategori, setSelectedSubKategori] = useState('');
  const [selectedWaktu, setSelectedWaktu] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const kategoriData = {
    bencana: ['Banjir', 'Tanah Longsor', 'Kekeringan'],
    wisata: ['Wisata Alam', 'Wisata Budaya', 'Wisata Kuliner'],
    desa: ['Pembangunan Desa', 'Ekonomi Desa', 'Budaya Desa']
  };

  const waktuOptions = [
    'Hari Ini',
    'Minggu Ini',
    'Bulan Ini',
    '3 Bulan Terakhir',
    'Tahun Ini'
  ];

  const handleKategoriChange = (kategori: string) => {
    setSelectedKategori(kategori);
    setSelectedSubKategori('');
    setOpenDropdown(null);
    onFilterChange?.({ kategori, subKategori: '', waktu: selectedWaktu });
  };

  const handleSubKategoriChange = (subKategori: string) => {
    setSelectedSubKategori(subKategori);
    setOpenDropdown(null);
    onFilterChange?.({ kategori: selectedKategori, subKategori, waktu: selectedWaktu });
  };

  const handleWaktuChange = (waktu: string) => {
    setSelectedWaktu(waktu);
    setOpenDropdown(null);
    onFilterChange?.({ kategori: selectedKategori, subKategori: selectedSubKategori, waktu });
  };

  const handleReset = () => {
    setSelectedKategori('');
    setSelectedSubKategori('');
    setSelectedWaktu('');
    setOpenDropdown(null);
    onFilterChange?.({ kategori: '', subKategori: '', waktu: '' });
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
        {/* Kategori Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'kategori' ? null : 'kategori')}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className={selectedKategori ? 'text-gray-900' : 'text-gray-500'}>
              {selectedKategori ? selectedKategori.charAt(0).toUpperCase() + selectedKategori.slice(1) : 'Pilih Kategori'}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'kategori' ? 'rotate-180' : ''}`} />
          </button>
          
          {openDropdown === 'kategori' && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {['bencana', 'wisata', 'desa'].map((kategori) => (
                <button
                  key={kategori}
                  onClick={() => handleKategoriChange(kategori)}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sub Kategori Dropdown */}
        {selectedKategori && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Kategori
            </label>
            <button
              onClick={() => setOpenDropdown(openDropdown === 'subKategori' ? null : 'subKategori')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className={selectedSubKategori ? 'text-gray-900' : 'text-gray-500'}>
                {selectedSubKategori || 'Pilih Sub Kategori'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'subKategori' ? 'rotate-180' : ''}`} />
            </button>
            
            {openDropdown === 'subKategori' && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {kategoriData[selectedKategori as keyof typeof kategoriData]?.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubKategoriChange(sub)}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Waktu Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Waktu Postingan
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'waktu' ? null : 'waktu')}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className={selectedWaktu ? 'text-gray-900' : 'text-gray-500'}>
              {selectedWaktu || 'Pilih Waktu'}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'waktu' ? 'rotate-180' : ''}`} />
          </button>
          
          {openDropdown === 'waktu' && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {waktuOptions.map((waktu) => (
                <button
                  key={waktu}
                  onClick={() => handleWaktuChange(waktu)}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  {waktu}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedKategori || selectedSubKategori || selectedWaktu) && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">Filter Aktif:</p>
          <div className="flex flex-wrap gap-2">
            {selectedKategori && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                {selectedKategori.charAt(0).toUpperCase() + selectedKategori.slice(1)}
              </span>
            )}
            {selectedSubKategori && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                {selectedSubKategori}
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
