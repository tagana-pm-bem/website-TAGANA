"use client";

import { usePathname } from "next/navigation";

interface HeaderProps {
  mainMenuItems: { label: string; path: string }[];
  settingsItems: { label: string; path: string }[];
}

export function AdminHeader({ mainMenuItems, settingsItems }: HeaderProps) {
  const pathname = usePathname();
  const allMenuItems = [...mainMenuItems, ...settingsItems];

  const currentRoute =
    allMenuItems.find(item => pathname.startsWith(item.path)) ?? null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {currentRoute?.label ?? "Admin Panel"}
        </h1>
        <p className="text-sm text-gray-500">
          {currentRoute?.label ? `Kelola ${currentRoute.label}` : "Kelola sistem administrasi desa"}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          🔔
        </button> */}


        <div className="flex items-center space-x-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin Desa</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            A
          </div>
        </div>
      </div>
    </div>
  );
}
