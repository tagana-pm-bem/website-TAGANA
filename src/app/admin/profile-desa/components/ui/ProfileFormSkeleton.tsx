'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfileFormSkeleton() {
  return (
    <div className="container mx-auto py-1 max-w-full space-y-8 animate-pulse">
      <Card className="border-none shadow-xl h-[700px] rounded-[2rem] overflow-hidden bg-white flex flex-col">
        {/* HEADER SKELETON */}
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 shrink-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-md" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-10 flex-1">
          {/* SELECT SKELETON */}
          <div className="space-y-4 max-w-md">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* PHOTO SKELETON (4 Col) */}
            <div className="md:col-span-4 space-y-4">
              <Skeleton className="h-4 w-36 rounded-md" />
              <Skeleton className="aspect-square w-full rounded-[2rem]" />
              <Skeleton className="h-3 w-32 mx-auto rounded-md" />
            </div>

            {/* FORM SKELETON (8 Col) */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-40 rounded-md" />
                <Skeleton className="h-[220px] w-full rounded-2xl" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-14 w-56 rounded-2xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FOOTER TIPS SKELETON */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-50 flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}