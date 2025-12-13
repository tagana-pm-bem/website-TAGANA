"use client";

import React from "react";
import { mainMenuItems, settingsItems } from "@/components/admin/adminMenu";
import { AdminSidebar  } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
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

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
