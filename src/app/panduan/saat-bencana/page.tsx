
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Waves, Activity, Mountain, Flame, AlertTriangle, AlertCircle } from "lucide-react";

export default function SaatBencanaPage() {
const disasters = [
  {
    title: "Banjir",
    icon: Waves,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    steps: [
      "Segera evakuasi ke tempat yang lebih tinggi jika air terus meningkat.",
      "Matikan aliran listrik dan gas untuk mencegah sengatan listrik atau kebakaran.",
      "Hindari berjalan di arus banjir karena berisiko terseret dan terdapat benda tajam."
    ],
    warning: {
      type: "warning",
      message: "Jangan menyeberangi banjir yang arusnya deras meskipun terlihat dangkal."
    }
  },
  {
    title: "Gempa Bumi",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    steps: [
      "Lindungi kepala dan tubuh dengan posisi berlindung (drop, cover, and hold on).",
      "Menjauhi kaca, lemari, dan benda berat yang dapat roboh.",
      "Jika berada di luar, menjauh dari bangunan, tiang listrik, dan pohon."
    ],
    warning: {
      type: "warning",
      message: "Tetap waspada terhadap gempa susulan setelah guncangan utama berhenti."
    }
  },
  {
    title: "Tanah Longsor",
    icon: Mountain,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    steps: [
      "Segera menjauh dari lereng atau tebing yang berpotensi longsor.",
      "Evakuasi ke area aman jika terdengar suara gemuruh atau retakan tanah.",
      "Ikuti arahan petugas dan jangan kembali sebelum dinyatakan aman."
    ],
    warning: {
      type: "warning",
      message: "Hujan deras dapat memicu longsor susulan dalam waktu singkat."
    }
  },
  {
    title: "Kebakaran",
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-50",
    steps: [
      "Segera keluar dari bangunan dan cari jalur evakuasi terdekat.",
      "Tutup hidung dan mulut dengan kain basah untuk menghindari asap.",
      "Jika api kecil dan aman, gunakan alat pemadam api ringan (APAR)."
    ],
    warning: {
      type: "info",
      message: "Jangan kembali ke dalam bangunan sebelum petugas menyatakan aman."
    }
  }
];


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Panduan Saat Bencana</h1>
        <p className="text-muted-foreground">
          Langkah-langkah penting yang harus dilakukan saat terjadi bencana
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
                    <div key={stepIndex} className="flex gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {stepIndex + 1}
                      </div>
                      <p className="text-md text-muted-foreground flex-1 pt-0.7">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {disaster.warning && (
                  <Alert variant={disaster.warning.type === "danger" ? "destructive" : disaster.warning.type === "info" ? "default" : "default"} className={disaster.warning.type === "info" ? "border-blue-200 bg-blue-50" : disaster.warning.type === "warning" ? "border-yellow-200 bg-yellow-50" : ""}>
                    {disaster.warning.type === "danger" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : disaster.warning.type === "info" ? (
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
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
