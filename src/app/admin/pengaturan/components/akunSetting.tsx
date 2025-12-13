import Card from "@/components/ui/card";
import { Save, Lock, User } from "lucide-react";

export default function PengaturanAkun() {
  return (
    <Card className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <User size={18} className="text-blue-500" />
          <h1 className="text-md font-semibold">Pengaturan Akun</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Username"
            placeholder="Masukkan username..."
          />
          <Input
            label="Email Administrator"
            placeholder="admin@desa.go.id"
          />
        </div>
      </div>

      <div className="border-b border-gray-200" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-blue-500" />
          <h1 className="text-md font-semibold">Ganti Kata Sandi</h1>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            label="Kata Sandi Saat Ini"
            type="password"
            placeholder="Masukkan kata sandi saat ini..."
          />
          <Input
            label="Kata Sandi Baru"
            type="password"
            placeholder="Masukkan kata sandi baru..."
          />
          <Input
            label="Konfirmasi Kata Sandi Baru"
            type="password"
            placeholder="Ulangi kata sandi baru..."
          />
        </div>
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
          <span className="text-sm font-semibold">
            Update Password
          </span>
        </button>
      </div>
    </Card>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-blue-500 text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="
          border border-gray-300
          rounded-xl
          px-4 py-2.5
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-200
        "
      />
    </div>
  );
}
