import PanduanCard from "../components/PanduanCard";
import { Waves, Zap, Mountain, Flame } from "lucide-react";

export default function Prabencana() {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Panduan Prabencana</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PanduanCard 
          title="Kesiapsiagaan Banjir"
          icon={<Waves />}
          steps={[
            "Bersihkan saluran air, selokan, dan sungai dari sampah secara rutin agar aliran tidak tersumbat.",
            "Amankan dokumen penting dalam wadah kedap air dan simpan di rak yang tinggi.",
            "Siapkan Tas Siaga Bencana berisi obat-obatan, senter, pakaian, dan makanan instan."
          ]}
          note="Pastikan seluruh anggota keluarga mengetahui jalur evakuasi menuju tempat tinggi."
        />
        
        <PanduanCard 
          title="Kesiapsiagaan Gempa"
          icon={<Zap />}
          steps={[
            "Atur perabotan berat seperti lemari agar menempel kuat pada dinding (dipaku/diikat).",
            "Kenali tempat paling aman di dalam rumah, seperti di bawah meja yang kokoh.",
            "Catat nomor telepon penting (PMI, Rumah Sakit, Pemadam Kebakaran) di ponsel."
          ]}
          note="Lakukan simulasi evakuasi mandiri bersama keluarga minimal setahun sekali."
        />

        <PanduanCard 
          title="Kesiapsiagaan Longsor"
          icon={<Mountain />}
          steps={[
            "Hindari membangun rumah di bawah atau di atas tebing yang terjal tanpa penguat.",
            "Tanam pepohonan dengan akar kuat (seperti jati atau mahoni) untuk memperkuat tanah.",
            "Perhatikan munculnya retakan baru di lereng atau rembesan air tiba-tiba."
          ]}
        />

        <PanduanCard 
          title="Pencegahan Kebakaran"
          icon={<Flame />}
          steps={[
            "Periksa instalasi listrik secara berkala, ganti kabel yang sudah mengelupas atau rapuh.",
            "Jangan meninggalkan kompor menyala saat keluar rumah atau saat tidur.",
            "Hindari penggunaan stop kontak yang bertumpuk berlebihan (beban arus tinggi)."
          ]}
        />
      </div>
    </div>
  );
}