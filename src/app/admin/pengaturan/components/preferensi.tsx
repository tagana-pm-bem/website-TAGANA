import Card from "@/components/ui/card";

export default function Preferensi() {
  return (
    <Card className="flex flex-col gap-6">
      <h1 className="text-sm font-semibold">Preferensi & Notifikasi</h1>

      <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
        <p className="text-sm font-semibold">
          Mode Pemeliharaan (Maintenance)
        </p>
        <p className="text-xs text-gray-500">
          Nonaktifkan akses pada publik ke website desa sementara waktu
        </p>
      </div>

      <SettingToggle
        title="Notifikasi Laporan Warga"
        description="Terima email saat ada laporan baru dari warga"
      />

      <SettingToggle
        title="Backup Data Otomatis"
        description="Lakukan pencadangan data sistem setiap minggu"
      />
    </Card>
  );
}

function SettingToggle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div
          className="
            w-11 h-6
            bg-gray-300
            peer-focus:outline-none
            rounded-full
            peer
            peer-checked:bg-blue-500
            transition
          "
        ></div>
        <div
          className="
            absolute left-1 top-1
            w-4 h-4
            bg-white
            rounded-full
            transition
            peer-checked:translate-x-5
          "
        ></div>
      </label>
    </div>
  );
}
