// Define disaster detail interface
export interface DisasterDetail {
  id: number;
  type: string;
  severity: "none" | "low" | "medium" | "high";
  description: string;
  icon: string; 
  // icon identifier: flood, landslide, earthquake, volcano, wind, drought
}

// type iconType = "flood" | "landslide" | "earthquake" | "volcano" | "wind" | "drought";


// kontol kuda
// coba force
// Disaster data for each dusun
export const disasterDataByDusun: { [key: string]: DisasterDetail[] } = {
  "Miri": [
    { 
      id: 1,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
    { 
      id: 2,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
    { 
      id: 3,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
  ],
  "Jati": [
    { 
      id: 4,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
  ],
  "Mojohuro": [
    { 
      id: 5,
      type: "Banjir", 
      severity: "low", 
      description: "Genangan ringan di beberapa titik saat hujan deras", 
      icon: "flood" 
    },
  ],
  "Pelemadu": [
    { 
      id: 6,
      type: "tidak ada bencana", 
      severity: "none", 
      description: "Aman dari bencana alam utama", 
      icon: "none" 
    }
  ],
  "Sungapan": [
    { 
      id: 7,
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir dan genangan air tinggi", 
      icon: "flood" 
    },
  ],
  "Gondosuli": [
    { 
      id: 8,
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang saat musim hujan", 
      icon: "flood" 
    },
  ],
  "Trukan": [
    { 
      id: 9,
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang dan luapan sungai", 
      icon: "flood" 
    },
  ],
  "Dogongan": [
    { 
      id: 10,
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir bandang musim hujan", 
      icon: "flood" 
    },
  ],
  "Ketos": [
    { 
      id: 11,
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir dan genangan tinggi", 
      icon: "flood" 
    },
  ],
  "Ngrancah": [
    { 
      id: 12,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan saat hujan lebat", 
      icon: "flood" 
    },
  ],
  "Pengkol": [
    { 
      id: 13,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir saat musim hujan", 
      icon: "flood" 
    },
  ],
  "Sompok": [
    { 
      id: 14,
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan genangan air saat hujan deras", 
      icon: "flood" 
    },
  ],
  "Wunut": [
    { 
      id: 15,
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir di area sawah", 
      icon: "flood" 
    },
  ]
};

// Helper function to get disaster data for a dusun
export const getDisasterDataForDusun = (dusunName: string): DisasterDetail[] => {
  return disasterDataByDusun[dusunName] || [];
};

// Export disaster types for reference
export const disasterTypes = {
  flood: "Banjir",
  landslide: "Tanah Longsor",
  earthquake: "Gempa Bumi",
  volcano: "Erupsi Merapi",
  wind: "Angin Puting Beliung",
  drought: "Kekeringan"
};

export default disasterDataByDusun;
