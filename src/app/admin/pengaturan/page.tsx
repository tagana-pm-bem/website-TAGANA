"use client";

import { useState } from "react";
import PengaturanAkun from "./components/akunSetting";
import AdminList from "./components/adminList";
import { Users } from "lucide-react";

export default function PengaturanPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 mb-[100px] max-w-5xl mx-auto gap-8">
      
      <div className="flex flex-col gap-2 pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users size={24} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Kelola akun administrator yang memiliki akses ke dashboard ini.
        </p>
      </div>

      <div className="flex flex-col w-full gap-8 items-start">
        
        <div className="w-full">
          <PengaturanAkun onSuccess={handleRefresh} />
        </div>

        <div className="w-full ">
          <AdminList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}