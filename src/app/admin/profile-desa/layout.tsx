"use client";
import React from "react";
export default function ProfileDesaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex w-full gap-8 bg-transparent">
        <main className="flex-1 min-w-0 space-y-8">
          {children}
        </main>
      </div>
  );
}