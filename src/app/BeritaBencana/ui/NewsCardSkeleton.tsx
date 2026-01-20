"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden border-none shadow-md rounded-[2rem] flex flex-col h-full p-0 bg-white">
      {/* Area Gambar dengan Overlay Warna Brand */}
      <div className="relative w-full aspect-video bg-slate-100 overflow-hidden m-0">
        {/* Efek Shimmer Warna Biru Brand */}
        <Skeleton className="absolute inset-0 bg-gradient-to-r from-slate-100 via-blue-50/50 to-slate-100 animate-shimmer" />
        
        {/* Skeleton Badge Kategori (Berwarna Biru Muda) */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-full bg-blue-100/50 border border-blue-200/30" />
        </div>

        {/* Skeleton Badge Status (Berwarna Abu Halus) */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-16 rounded-full bg-slate-200/50" />
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        {/* Skeleton Title (Warna Biru Sangat Muda) */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full rounded-md bg-blue-50/30" />
          <Skeleton className="h-5 w-[80%] rounded-md bg-blue-50/30" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pt-0">
        {/* Skeleton Description */}
        <div className="space-y-2 mb-4 flex-1">
          <Skeleton className="h-3 w-full rounded-md bg-slate-50" />
          <Skeleton className="h-3 w-full rounded-md bg-slate-50" />
          <Skeleton className="h-3 w-[60%] rounded-md bg-slate-50" />
        </div>

        {/* Bottom Info (Date & Location) */}
        <div className="flex items-center justify-between pt-4 py-3 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full bg-slate-100" />
            <Skeleton className="h-3 w-24 rounded-md bg-slate-100" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full bg-slate-100" />
            <Skeleton className="h-3 w-16 rounded-md bg-slate-100" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}