"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { InfoModal } from '@/components/ui/modal_desa';
import Image from "next/image";

export function Navbar() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLastUpdate(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-2xl border-b-2" : "shadow-lg border-b-4"
        } border-[#2e68b8ab]`}
      >
        <div className="w-full mx-auto px-4 sm:px-14">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Left side - Logo & Title */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group flex-shrink-0">
              {/* Logo with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#044BB1] to-[#0566d6] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="border-2 border-blue-700 sm:border-3 md:border-4 relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl">
                  <Image
                    src="/tagana_logo.png"
                    alt="Tagana Logo"
                    width={60}
                    height={60}
                    className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14"
                    priority
                  />
                </div>
              </div>

              {/* Title with gradient */}
              <div className="flex flex-col">
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black bg-linear-to-r from-[#044BB1] to-[#0566d6] bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-sm">
                  TAGANA
                </h1>
                <div className="flex items-center space-x-1 -mt-0.5 sm:-mt-1">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#044BB1] rounded-full"></div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-bold tracking-wide">
                    Sriharjo
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8 lg:gap-6 xl:gap-8">
              <button
                onClick={() => router.push('/peta-page')}
                className={`text-sm lg:text-base font-semibold transition-colors duration-200 relative group cursor-pointer ${
                  pathname === '/peta-page' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Peta
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#044BB1] transition-all duration-300 ${
                  pathname === '/peta-page' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>

              <button
                onClick={() => router.push('/EventListPage')}
                className={`text-sm lg:text-base font-semibold transition-colors duration-200 relative group cursor-pointer ${
                  pathname === '/EventListPage' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Event
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#044BB1] transition-all duration-300 ${
                  pathname === '/EventListPage' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
              
              <button
                onClick={() => router.push('/BeritaBencana')}
                className={`text-sm lg:text-base font-semibold transition-colors duration-200 relative group cursor-pointer ${
                  pathname === '/BeritaBencana' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Berita Terkini
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#044BB1] transition-all duration-300 ${
                  pathname === '/BeritaBencana' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>

              {/* Desktop Login Button */}
              <button
                onClick={() => router.push('/auth/login')}
                className="flex cursor-pointer items-center space-x-1.5 px-4 lg:px-6 py-2 md:py-2.5 bg-gradient-to-r from-gray-500 to-gray-900 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs lg:text-base font-semibold whitespace-nowrap">Admin</span>
              </button>
            </div>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg  hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
                <svg
                className="w-6 h-6 text-blue-700 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </button>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-white/50 blur-lg z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#044BB1]">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <button
              onClick={() => handleNavigation('/peta-page')}
              className={`w-full text-left px-6 py-3 font-semibold transition-colors duration-200 ${
                pathname === '/peta-page' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Peta
            </button>

            <button
              onClick={() => handleNavigation('/EventListPage')}
              className={`w-full text-left px-6 py-3 font-semibold transition-colors duration-200 ${
                pathname === '/EventListPage' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Event
            </button>

            <button
              onClick={() => handleNavigation('/BeritaBencana')}
              className={`w-full text-left px-6 py-3 font-semibold transition-colors duration-200 ${
                pathname === '/BeritaBencana' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`} 
            >
              Berita Terkini
            </button>

            <div className="border-t border-gray-300 my-4"></div>

            <button
              onClick={() => handleNavigation('/auth/login')}
              className="w-full mx-4 flex items-center space-x-2 px-4 py-3 bg-gradient-to-r shadow-[-1px_3px_9px_-1px_rgba(0,_0,_0,_0.7)] from-gray-700 to-gray-900 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all duration-300"
              style={{ width: 'calc(100% - 2rem)' }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold">Login Admin</span>
            </button>
          </div>
        </div>
      </div>

      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
      />
    </>
  );
}