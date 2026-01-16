"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { mainMenuItems, settingsItems } from "@/components/admin/adminMenu";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { authService } from "@/app/auth/services/authService";
import { SweetAlertProvider } from "@/components/ui/SweetAlertProvider";
// 1. Impor Toaster dari sonner
import { Toaster } from "sonner"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!isMounted) return;
        if (!user) {
          router.replace("/auth/login");
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        if (isMounted) router.replace("/auth/login");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    checkAuth();
    return () => { isMounted = false; };
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <SweetAlertProvider>
      {/* 2. Tambahkan Toaster di sini agar aktif di seluruh halaman Admin */}
      <Toaster 
        position="top-center" 
        richColors 
        expand={true}
        closeButton
      />

      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <div className="w-64 bg-gray-900 text-white min-h-screen fixed">
            <AdminSidebar />
          </div>

          <div className="ml-64 flex-1">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <AdminHeader
                mainMenuItems={mainMenuItems}
                settingsItems={settingsItems}
              />
            </div>

            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </SweetAlertProvider>
  );
}