'use client';

import { ChevronDown, LucideIcon } from "lucide-react";

type OptionItem = {
  label: string;
  color: string; // class warna text, misal "text-red-500"
  icon?: LucideIcon;
};

interface DropdownProps {
  label: string;      // Label default (misal: "Pilih Bencana")
  value: string;      // Nilai yang terpilih sekarang
  open: boolean;      // State buka/tutup
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  options: OptionItem[];
  icon?: LucideIcon;  // Icon di sebelah kiri judul (opsional)
}

export default function Dropdown({
  label,
  value,
  open,
  setOpen,
  setValue,
  options,
  icon: Icon,
}: DropdownProps) {
  
  // Helper untuk mencari warna dari opsi yang sedang dipilih
  const selectedColor = options.find((opt) => opt.label === value)?.color || "text-gray-700";

  return (
    <div className="relative w-full">
      {/* Label di atas dropdown */}
      <label className="text-sm font-medium text-gray-600 mb-1 block">
        {label}
      </label>

      {/* Tombol Trigger Dropdown */}
      <div
        onClick={() => setOpen(!open)}
        className={`
          w-full px-4 py-3 flex flex-row items-center justify-between 
          bg-white rounded-xl shadow-sm border border-gray-300 cursor-pointer 
          hover:border-blue-400 transition-all duration-200
          ${open ? "ring-2 ring-blue-100 border-blue-400" : ""}
        `}
      >
        <div className="flex flex-row items-center gap-3">
          {/* Icon Opsional */}
          {Icon && <Icon size={20} className="text-blue-500" />}
          
          <span className={`text-sm font-medium ${value === label ? "text-gray-400" : selectedColor}`}>
            {value}
          </span>
        </div>
        
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* List Dropdown Items */}
      {open && (
        <div className="absolute z-10 top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setValue(option.label);
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
              >
                {/* Kalau di option ada icon khusus */}
                {option.icon && <option.icon size={16} className={option.color} />}
                
                <span className={`text-sm font-medium ${option.color}`}>
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Overlay transparan untuk menutup dropdown saat klik di luar (Opsional tapi UX bagus) */}
      {open && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setOpen(false)} 
        />
      )}
    </div>
  );
}