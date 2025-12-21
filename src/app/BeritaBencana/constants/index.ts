// Default style jika kategori tidak ditemukan
const DEFAULT_STYLE = {
  title: "Berita",
  badge: "bg-gray-100 text-gray-700 border-gray-300",
  activeBadge: "bg-gray-600 text-white",
  group: "umum",
};

/**
 * Konfigurasi Styling (Warna & Group)
 * Key menggunakan huruf kecil (lowercase) agar cocok dengan data dari database.
 */
export const KATEGORI_CONFIG: Record<
  string,
  {
    title?: string;
    badge: string;
    activeBadge: string;
    group: "bencana" | "umum";
  }
> = {
  // 1. Bencana Alam (Merah)
  "bencana alam": {
    title: "Bencana Alam",
    badge: "bg-red-100 text-red-700 border-red-300",
    activeBadge: "bg-red-600 text-white",
    group: "bencana",
  },

  // 2. Kesehatan (Hijau)
  "kesehatan": {
    title: "Kesehatan",
    badge: "bg-green-100 text-green-700 border-green-300",
    activeBadge: "bg-green-600 text-white",
    group: "umum",
  },

  // 3. Pendidikan (Biru)
  "pendidikan": {
    title: "Pendidikan",
    badge: "bg-blue-100 text-blue-700 border-blue-300",
    activeBadge: "bg-blue-600 text-white",
    group: "umum",
  },

  // 4. Ekonomi (Teal/Tosca)
  "ekonomi": {
    title: "Ekonomi",
    badge: "bg-teal-100 text-teal-700 border-teal-300",
    activeBadge: "bg-teal-600 text-white",
    group: "umum",
  },
};

// Status Badge Colors (Tetap dipertahankan untuk status postingan)
export const STATUS_BADGE = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-200 text-gray-700",
} as const;

/**
 * HELPER FUNCTION:
 * Mengambil konfigurasi style berdasarkan nama kategori dari database.
 * Menangani huruf besar/kecil (case-insensitive).
 */
export const getKategoriStyle = (kategoriName: string) => {
  if (!kategoriName) return DEFAULT_STYLE;
  
  // Ubah ke lowercase agar cocok dengan key di atas ("Bencana Alam" -> "bencana alam")
  const key = kategoriName.toLowerCase().trim();
  
  return KATEGORI_CONFIG[key] || { 
    ...DEFAULT_STYLE, 
    title: kategoriName // Fallback title sesuai nama asli
  };
};

// List statis hanya untuk keperluan dropdown manual jika tidak fetch dari DB
export const KATEGORI_LIST: string[] = [
  "Bencana Alam",
  "Kesehatan",
  "Pendidikan",
  "Ekonomi"
];