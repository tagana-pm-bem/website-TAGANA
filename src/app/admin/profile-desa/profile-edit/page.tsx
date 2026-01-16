'use client';

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Home, 
  Settings2, 
  LayoutDashboard 
} from "lucide-react";

// SHADCN UI COMPONENTS
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/skeleton";

// INTERNAL COMPONENTS & SKELETONS
import ProfileForm from "../components/ProfileForm";
import { ProfileFormSkeleton } from "../components/ui/ProfileFormSkeleton"; // Impor skeleton form
import { QuickStats, QuickStatsSkeleton } from "../components/widgets/QuickStats"; // Impor skeleton stats

// LOGIC HOOKS
import { useProfileManager } from "../Hook/useProfileManager";

export default function ProfileEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dusunId = searchParams.get("id");

  const { 
    currentDusun, 
    handleSelectDusun, 
    isLoading 
  } = useProfileManager();

  useEffect(() => {
    if (dusunId) {
      handleSelectDusun(dusunId);
    }
  }, [dusunId, handleSelectDusun]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* NAVIGATION & BREADCRUMB SECTION */}
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard" className="flex items-center gap-1 font-medium">
                <Home size={14} /> Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/profile-desa" className="font-medium text-slate-500 hover:text-[#044BB1]">
                Profil Desa
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLoading ? (
                <Skeleton className="h-4 w-32 rounded-md" />
              ) : (
                <BreadcrumbPage className="font-medium text-[#044BB1]">
                  Edit Profil Dusun {currentDusun?.nama}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.push("/admin/profile-desa")}
              className="rounded-xl border-slate-200 hover:bg-blue-50 text-slate-600 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </Button>
            <div>
              <h1 className="text-xl font-medium text-slate-900 tracking-tight">
                Editor Profil Wilayah
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  ID Wilayah: {dusunId || "..."}
                </p>
                <span className="text-slate-200">•</span>
                {isLoading ? (
                  <Skeleton className="h-3 w-20 rounded-md" />
                ) : (
                  <p className="text-xs font-medium text-[#044BB1] uppercase tracking-widest">
                    {currentDusun?.nama}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="rounded-xl font-medium text-slate-400 hover:text-slate-600 gap-2 hidden md:flex"
            onClick={() => router.push("/admin/dashboard")}
          >
            <LayoutDashboard size={16} /> Beranda Utama
          </Button>
        </div>
      </div>

      {/* QUICK STATS REFERENCE SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <Settings2 size={16} className="text-slate-400" />
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest">Parameter Kependudukan</h2>
        </div>
        
        {/* Render Skeleton jika loading, Render Stats asli jika data sudah ada */}
        {isLoading || !currentDusun ? (
          <QuickStatsSkeleton />
        ) : (
          <QuickStats data={currentDusun} />
        )}
      </section>

      {/* MAIN EDITOR LAYOUT SECTION */}
      <div className="w-full">
        {/* Render Skeleton Form jika loading, Render Form asli jika data sudah ada */}
        {isLoading ? (
          <ProfileFormSkeleton />
        ) : (
          <ProfileForm />
        )}
      </div>

      {/* FOOTER INFO */}
      <footer className="text-center pt-8 border-t border-slate-100 pb-12">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.3em]">
          Finalisasi Profil • Desa Sriharjo 2026
        </p>
      </footer>
    </div>
  );
}