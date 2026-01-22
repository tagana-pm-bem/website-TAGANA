import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/separator";
import { Waves, Zap, Mountain, Flame, CheckCircle2, AlertTriangle } from "lucide-react";
import NavigasiButton from "../components/layout/NavigasiButton";

export default function Prabencana() {
  const panduanData = [
    {
      title: "Kesiapsiagaan Banjir",
      icon: <Waves className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
      steps: [
        "Bersihkan saluran air, selokan, dan sungai dari sampah secara rutin agar aliran tidak tersumbat.",
        "Amankan dokumen penting dalam wadah kedap air dan simpan di rak yang tinggi.",
        "Siapkan Tas Siaga Bencana berisi obat-obatan, senter, pakaian, dan makanan instan."
      ],
      note: "Pastikan seluruh anggota keluarga mengetahui jalur evakuasi menuju tempat tinggi."
    },
    {
      title: "Kesiapsiagaan Gempa",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
      steps: [
        "Atur perabotan berat seperti lemari agar menempel kuat pada dinding (dipaku/diikat).",
        "Kenali tempat paling aman di dalam rumah, seperti di bawah meja yang kokoh.",
        "Catat nomor telepon penting (PMI, Rumah Sakit, Pemadam Kebakaran) di ponsel."
      ],
      note: "Lakukan simulasi evakuasi mandiri bersama keluarga minimal setahun sekali."
    },
    {
      title: "Kesiapsiagaan Longsor",
      icon: <Mountain className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
      steps: [
        "Hindari membangun rumah di bawah atau di atas tebing yang terjal tanpa penguat.",
        "Tanam pepohonan dengan akar kuat (seperti jati atau mahoni) untuk memperkuat tanah.",
        "Perhatikan munculnya retakan baru di lereng atau rembesan air tiba-tiba."
      ]
    },
    {
      title: "Pencegahan Kebakaran",
      icon: <Flame className="w-6 h-6" />,
      color: "bg-red-100 text-red-600",
      steps: [
        "Periksa instalasi listrik secara berkala, ganti kabel yang sudah mengelupas atau rapuh.",
        "Jangan meninggalkan kompor menyala saat keluar rumah atau saat tidur.",
        "Hindari penggunaan stop kontak yang bertumpuk berlebihan (beban arus tinggi)."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Panduan Prabencana
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Langkah-langkah persiapan dan kesiapsiagaan sebelum bencana terjadi
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {panduanData.map((panduan, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-none shadow-md">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${panduan.color}`}>
                    {panduan.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900">
                      {panduan.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Steps List */}
                  <div className="space-y-3">
                    {panduan.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Note Section */}
                  {panduan.note && (
                    <>
                      <Separator className="my-4" />
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <div className="flex gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-amber-800 mb-1">
                              Catatan Penting
                            </p>
                            <p className="text-sm text-amber-700">
                              {panduan.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}