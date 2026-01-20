
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Waves, Activity, Mountain, Flame, AlertCircle } from "lucide-react";

export default function PascaBencanaPage() {
  const disasters = [
    {
      title: "Banjir",
      icon: Waves,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      steps: [
        "Bersihkan rumah dan lingkungan dari sisa lumpur menggunakan antiseptik.",
        "Periksa instalasi listrik dan gas sebelum dinyalakan kembali untuk mencegah kebakaran.",
        "Buang makanan yang terendam banjir karena berpotensi tercemar bakteri."
      ],
      warning: {
        type: "info",
        message: "Waspadai munculnya penyakit kulit, diare, dan leptospirosis pasca banjir."
      }
    },
    {
      title: "Gempa Bumi",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      steps: [
        "Periksa kondisi bangunan (retakan dinding, atap miring) sebelum memutuskan masuk kembali.",
        "Jangan menyalakan api (korek/lilin) jika tercium bau gas yang menyengat.",
        "Ikuti informasi resmi dari BMKG terkait potensi gempa susulan."
      ],
      warning: {
        type: "warning",
        message: "Tetap waspada terhadap puing-puing bangunan yang belum stabil."
      }
    },
    {
      title: "Tanah Longsor",
      icon: Mountain,
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      steps: [
        "Jangan mendekati area longsoran karena tanah mungkin masih labil dan bergerak.",
        "Bantu petugas dalam pendataan korban atau kerusakan jika kondisi aman.",
        "Lakukan penghijauan kembali (reboisasi) pada lahan kritis setelah dinyatakan aman."
      ],
      warning: {
        type: "warning",
        message: "Hindari membangun rumah kembali tepat di jalur bekas longsor."
      }
    },
    {
      title: "Kebakaran",
      icon: Flame,
      color: "text-red-600",
      bgColor: "bg-red-50",
      steps: [
        "Pastikan api benar-benar padam (pendinginan) sebelum memilih barang sisa.",
        "Inventarisir kerugian dan dokumen penting yang rusak untuk pelaporan ke desa.",
        "Bersihkan puing-puing dengan menggunakan masker dan sarung tangan tebal."
      ],
      warning: {
        type: "info",
        message: "Segera urus surat keterangan kebakaran dari kepolisian/desa untuk keperluan asuransi."
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panduan Pasca Bencana</h1>
        <p className="text-muted-foreground">
          Langkah-langkah pemulihan dan rehabilitasi setelah bencana terjadi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {disasters.map((disaster, index) => {
          const IconComponent = disaster.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${disaster.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${disaster.color}`} />
                  </div>
                  <span>{disaster.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {disaster.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-3 ">
                      <div className="shrink-0 w-6  h-6 rounded-full  text-primary-foreground flex items-center justify-center text-sm font-semibold bg-blue-600 ">
                        {stepIndex + 1}
                      </div>
                      <p className="text-md text-muted-foreground flex-1 pt-0.7">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {disaster.warning && (
                  <Alert 
                    variant="default" 
                    className={disaster.warning.type === "info" ? "border-blue-200 bg-blue-50" : "border-yellow-200 bg-yellow-50"}
                  >
                    <AlertCircle className={`h-4 w-4 ${disaster.warning.type === "info" ? "text-blue-600" : "text-yellow-600"}`} />
                    <AlertDescription className="text-sm">
                      {disaster.warning.message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
