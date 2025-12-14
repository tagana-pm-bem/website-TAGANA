import Image from "next/image";



export interface BeritaBencana {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: "Banjir" | "Longsor" | "Gempa" | "Angin Puting Beliung" | "Kebakaran" | "Lainnya";
  location: string;
  date: string;
  time: string;
  casualties?: {
    meninggal?: number;
    lukaRingan?: number;
    lukaBerat?: number;
    hilang?: number;
  };
  damage?: {
    rumah?: number;
    fasilitas?: string[];
  };
  status: "Terjadi" | "Ditangani" | "Selesai";
  author: string;
}

export const beritaBencanaData: BeritaBencana[] = [
  {
    id: 1,
    title: "Banjir Melanda Dusun Sanggrahan Akibat Hujan Deras",
    description: "Banjir setinggi 1 meter merendam puluhan rumah warga di Dusun Sanggrahan",
    content: `Banjir melanda Dusun Sanggrahan, Desa Sriharjo pada Selasa (15/01/2025) pukul 14.00 WIB akibat hujan deras yang mengguyur wilayah tersebut sejak dini hari. Ketinggian air mencapai 1 meter dan merendam sekitar 45 rumah warga.

Tim TAGANA Sriharjo langsung turun ke lokasi untuk melakukan evakuasi warga yang terdampak. Sebanyak 120 jiwa telah dievakuasi ke posko pengungsian di Balai Desa Sriharjo.

Kepala Desa Sriharjo, Bapak Suryanto menyatakan bahwa bantuan logistik berupa makanan siap saji, air bersih, dan selimut telah disalurkan kepada para pengungsi. Tim medis juga standby untuk memberikan pelayanan kesehatan.

Warga diimbau untuk tetap waspada karena intensitas hujan masih tinggi dan kondisi air di sungai masih dalam level siaga.`,
    image: "/assets/image copy.png",
    category: "Banjir",
    location: "Dusun Sanggrahan",
    date: "2025-01-15",
    time: "14:00",
    casualties: {
      lukaRingan: 5,
    },
    damage: {
      rumah: 45,
      fasilitas: ["Jalan utama dusun", "Jembatan penghubung"],
    },
    status: "Ditangani",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 2,
    title: "Tanah Longsor di Dusun Jetis Timur",
    description: "Material longsor menimbun 2 rumah warga di lereng Gunung Merapi",
    content: `Tanah longsor terjadi di Dusun Jetis Timur pada Senin (14/01/2025) pukul 03.30 WIB. Material longsor berupa tanah dan bebatuan menimbun 2 unit rumah warga di kaki lereng.

Beruntung tidak ada korban jiwa dalam kejadian ini karena warga sempat mendengar suara gemuruh dan langsung mengungsi. Tim SAR gabungan langsung melakukan pencarian dan evakuasi.

Material longsor diperkirakan mencapai 500 meter kubik. Akses jalan menuju lokasi sempat terputus dan kini sudah dapat dilalui kendaraan kecil.

BPBD Kabupaten Sleman telah mengirimkan bantuan berupa tenda darurat, makanan, dan kebutuhan pokok untuk para pengungsi. Total 15 KK atau 52 jiwa mengungsi di rumah kerabat dan balai dusun.`,
    image: "/assets/image_copy 3.png",
    category: "Longsor",
    location: "Dusun Jetis Timur",
    date: "2025-01-14",
    time: "03:30",
    casualties: {
      lukaRingan: 2,
    },
    damage: {
      rumah: 2,
      fasilitas: ["Jalan dusun sepanjang 50 meter"],
    },
    status: "Ditangani",
    author: "Tim TAGANA Sriharjo",
  },
  
  {
    id: 3,
    title: "Gempa 4.5 SR Guncang Sleman, Tidak Ada Kerusakan Berarti",
    description: "Getaran gempa terasa hingga wilayah Sriharjo namun tidak menimbulkan kerusakan",
    content: `Gempa bumi berkekuatan 4.5 SR mengguncang Kabupaten Sleman pada Sabtu (12/01/2025) pukul 08.15 WIB. Pusat gempa berada di kedalaman 10 km di wilayah Cangkringan.

Getaran gempa terasa hingga wilayah Desa Sriharjo. Warga sempat panik dan keluar rumah namun tidak ada kerusakan yang berarti. Beberapa warga melaporkan barang-barang di rak bergoyang.

BMKG menyatakan gempa ini tidak berpotensi tsunami. Masyarakat diminta tetap tenang dan waspada terhadap kemungkinan gempa susulan.

Tim TAGANA Sriharjo melakukan patroli ke seluruh dusun untuk memastikan kondisi warga dan tidak ditemukan kerusakan infrastruktur. Kegiatan masyarakat kembali normal setelah 2 jam pasca gempa.`,
    image: "/assets/image_copy 2.png",
    category: "Gempa",
    location: "Seluruh Wilayah Sriharjo",
    date: "2025-01-12",
    time: "08:15",
    casualties: {},
    damage: {
      rumah: 0,
      fasilitas: [],
    },
    status: "Selesai",
    author: "Tim TAGANA Sriharjo",
  },
 
];
