const DEFAULT_STYLE = {
  title: "Berita",
  badge: "bg-gray-100 text-gray-700 border-gray-300",
  activeBadge: "bg-gray-600 text-white",
  group: "umum",
};

export const KATEGORI_CONFIG: Record<
  string,
  {
    title?: string;
    badge: string;
    activeBadge: string;
    group: "bencana" | "umum";
  }
> = {
  "bencana alam": {
    title: "Bencana Alam",
    badge: "bg-red-100 text-red-700 border-red-300",
    activeBadge: "bg-red-600 text-white",
    group: "bencana",
  },

  "kesehatan": {
    title: "Kesehatan",
    badge: "bg-green-100 text-green-700 border-green-300",
    activeBadge: "bg-green-600 text-white",
    group: "umum",
  },

  "pendidikan": {
    title: "Pendidikan",
    badge: "bg-blue-100 text-blue-700 border-blue-300",
    activeBadge: "bg-blue-600 text-white",
    group: "umum",
  },

  "ekonomi": {
    title: "Ekonomi",
    badge: "bg-teal-100 text-teal-700 border-teal-300",
    activeBadge: "bg-teal-600 text-white",
    group: "umum",
  },
};

export const STATUS_BADGE = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-200 text-gray-700",
} as const;


export const getKategoriStyle = (kategoriName: string) => {
  if (!kategoriName) return DEFAULT_STYLE;
  
  const key = kategoriName.toLowerCase().trim();
  
  return KATEGORI_CONFIG[key] || { 
    ...DEFAULT_STYLE, 
    title: kategoriName
  };
};

export const KATEGORI_LIST: string[] = [
  "Bencana Alam",
  "Kesehatan",
  "Pendidikan",
  "Ekonomi"
];