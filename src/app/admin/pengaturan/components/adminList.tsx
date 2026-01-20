"use client";

import { useEffect, useState } from "react";
// SHADCN & UI COMPONENTS
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/Badge"; // Import sesuai instruksi (B Kapital)
import { Loader2, ShieldCheck, UserCircle, Fingerprint } from "lucide-react"; 
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

  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm rounded-[1.5rem]">
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#044BB1]" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat daftar administrator...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-[1.5rem] overflow-hidden bg-white">
      {/* HEADER SECTION */}
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-2xl text-[#044BB1] shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
              Daftar Administrator
            </CardTitle>
            <CardDescription className="text-sm font-medium text-slate-500">
              Manajemen akses dan profil pengguna tingkat administrator.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {admins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <UserCircle size={48} className="opacity-20 mb-2" />
            <p className="text-sm font-medium italic">Belum ada admin terdaftar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nama Lengkap</TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Username</TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</TableHead>
                  <TableHead className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status Akun</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => {
                  const isSelf = currentUser?.id === admin.id;
                  return (
                    <TableRow 
                      key={admin.id} 
                      className={`group border-slate-50 transition-colors ${isSelf ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-slate-50/50'}`}
                    >
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isSelf ? 'bg-[#044BB1] text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {admin.full_name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-900">{admin.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                          <Fingerprint size={14} className="text-slate-300" />
                          <span>@{admin.username}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <Badge 
                          variant="outline" 
                          className="bg-white text-[#044BB1] border-blue-100 font-bold px-3 py-1 rounded-lg shadow-sm"
                        >
                          {admin.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-center">
                        {isSelf ? (
                          <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 font-bold px-3 py-1 rounded-full shadow-none">
                            Akun Anda
                          </Badge>
                        ) : (
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* FOOTER STATS */}
      <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Sistem Keamanan TAGANA
        </p>
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm">
          <span className="text-[10px] font-bold text-slate-400">TOTAL ADMIN:</span>
          <span className="text-xs font-bold text-[#044BB1]">{admins.length}</span>
        </div>
      </div>
    </Card>
  );
}