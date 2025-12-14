"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; 
import { authService } from "@/app/auth/services/authService";
import { LogOut, ChevronDown, User } from "lucide-react";

interface HeaderProps {
  mainMenuItems: { label: string; path: string }[];
  settingsItems: { label: string; path: string }[];
}

interface UserProfile {
  full_name: string;
  role: string;
  username?: string;
}

export function AdminHeader({ mainMenuItems, settingsItems }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const allMenuItems = [...mainMenuItems, ...settingsItems];
  const currentRoute =
    allMenuItems.find((item) => pathname.startsWith(item.path)) ?? null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          const profile = await authService.getUserProfile(currentUser.id);
          if (profile) {
            setUserData(profile);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      console.log("[Logout] Berhasil logout");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("[Logout] Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
      setShowDropdown(false);
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-50 shadow-md">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {currentRoute?.label ?? "Admin Panel"}
        </h1>
        <p className="text-sm text-gray-500">
          {currentRoute?.label
            ? `Kelola ${currentRoute.label}`
            : "Kelola sistem administrasi desa"}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex items-center space-x-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {userData?.full_name || "Memuat..."}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userData?.role || "Admin"}
            </p>
          </div>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white font-bold cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
          >
            <span className="w-full text-center">
              {userData ? getInitial(userData.full_name) : <User size={18} className="mx-auto"/>}
            </span>
          </button>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-100 mb-2 md:hidden">
                 <p className="text-sm font-semibold text-gray-800 truncate">{userData?.full_name}</p>
                 <p className="text-xs text-gray-500 capitalize">{userData?.role}</p>
              </div>
              
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}