"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/card";
import { Loader2, ShieldAlert } from "lucide-react"; 
import { authService, UserProfile } from "../../../auth/services/authService";

interface AdminListProps {
  refreshTrigger: number;
}

export default function AdminList({ refreshTrigger }: AdminListProps) {
  const [admins, setAdmins] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
        
        const data = await authService.getAllAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Gagal load admin:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [refreshTrigger]);

  return (
    <Card className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
        <ShieldAlert size={20} className="text-blue-500" />
        <h1 className="text-md font-semibold text-gray-800">Daftar Administrator</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      ) : admins.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">Belum ada admin terdaftar.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Nama Lengkap</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Role</th>
                {/* Judul kolom diubah dari Aksi ke Keterangan */}
                <th className="px-4 py-3 rounded-tr-lg text-center">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">{admin.full_name}</td>
                  <td className="px-4 py-3 text-gray-600">@{admin.username}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {currentUser?.id === admin.id ? (
                      <span className="text-xs text-gray-400 italic">Akun Anda</span>
                    ) : (
                      <span className="text-xs text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}