import Card from "@/components/ui/card";
import Image from "next/image";
import { Camera, Save, Trash2, Upload } from "lucide-react";

export default function ProfilDesa() {
  return (
    <Card className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-md">Profil Desa / Instansi</h1>
        <div className="border-b border-gray-200" />
      </div>

      <div className="flex items-center gap-8">
        <div className="relative group w-24 h-24 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden shadow-sm ring-2 ring-gray-100">
            <Image
              src="/ketos.png"
              alt="Logo Desa"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <button
            className="
              absolute inset-0
              rounded-full
              bg-black/50
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition cursor-pointer
            "
          >
            <div className="flex flex-col cursor-pointer items-center text-white text-xs gap-1">
              <Camera size={18} />
              <span>Edit</span>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-semibold">Logo Desa</p>
            <p className="text-xs text-gray-500">
              Format JPG / PNG · Maks. 2MB
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-lg
                text-sm font-medium
                text-blue-600
                bg-blue-50
                hover:bg-blue-100
                shadow-sm
                transition cursor-pointer
              "
            >
              <Upload size={16} />
              Upload
            </button>

            <button
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-lg
                text-sm font-medium
                text-gray-600
                bg-gray-100
                hover:bg-red-100 hover:text-red-600
                shadow-sm
                transition cursor-pointer
              "
            >
              <Trash2 size={16} />
              Hapus
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200" />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nama Desa" placeholder="Masukkan nama desa..." />
          <Input
            label="Kode Desa (Kemendagri)"
            placeholder="Masukkan kode desa..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Kepala Desa" placeholder="Masukkan nama kepala desa..." />
          <Input label="Kecamatan" placeholder="Masukkan nama kecamatan..." />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-blue-500 text-md font-semibold">
            Alamat Kantor Desa
          </label>
          <textarea
            rows={4}
            placeholder="Masukkan alamat lengkap..."
            className="
              border border-gray-300 rounded-xl
              px-4 py-3
              text-sm
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-200
            "
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email Resmi" placeholder="contoh@desa.go.id" />
          <Input label="Nomor Telepon" placeholder="08xxxxxxxxxx" />
        </div>

        {/* Action */}
        <div className="flex justify-end pt-2">
          <button
            className="
              flex items-center gap-3
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-6 py-3
              rounded-xl
              shadow-md
              transition
            "
          >
            <Save size={20} />
            <span className="font-semibold text-sm">
              Simpan Perubahan
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-blue-500 text-md font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        className="
          border border-gray-300 rounded-xl
          px-4 py-2.5
          text-sm
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-200
        "
      />
    </div>
  );
}
