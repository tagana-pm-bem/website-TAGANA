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
        className="sticky top-0 z-50 bg-white shadow-md transition-shadow duration-300  ">
        <div className="w-full mx-auto px-4 sm:px-20 relative">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group shrink-0">
              <div className="relative">
                <div className="border-2 border-blue-500 sm:border-3 md:border-4 relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl">
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

              <div className="flex flex-col">
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-[#044BB1] to-[#0566d6] bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-sm">
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

            <div className="hidden md:flex items-center flex-1 justify-center">
              <div className="flex items-center gap-6 lg:gap-16 relative">
              <button
                onClick={() => router.push('/beranda')}
                className={`text-sm lg:text-xl font-light  transition-colors duration-200 relative group cursor-pointer ${
                pathname === '/beranda' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Beranda
                <span className={`absolute -bottom-[20px] sm:-bottom-[24px] md:-bottom-[32px] left-0 h-1 bg-[#044BB1] transition-all duration-500 ease-out ${
                pathname === '/beranda' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>

              <button
                onClick={() => router.push('/peta-page')}
                className={`text-sm lg:text-xl font-light  transition-colors duration-200 relative group cursor-pointer ${
                pathname === '/peta-page' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Peta
                <span className={`absolute -bottom-[20px] sm:-bottom-[24px] md:-bottom-[32px] left-0 h-1 bg-[#044BB1] transition-all duration-500 ease-out ${
                pathname === '/peta-page' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>

              <button
                onClick={() => router.push('/EventListPage')}
                className={`text-sm lg:text-xl font-light  transition-colors duration-200 relative group cursor-pointer ${
                pathname === '/EventListPage' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Event
                <span className={`absolute -bottom-[20px] sm:-bottom-[24px] md:-bottom-[32px] left-0 h-1 bg-[#044BB1] transition-all duration-500 ease-out ${
                pathname === '/EventListPage' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>
              
              <button
                onClick={() => router.push('/BeritaBencana')}
                className={`text-sm lg:text-xl font-light  transition-colors duration-200 relative group cursor-pointer ${
                pathname === '/BeritaBencana' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Berita 
                <span className={`absolute -bottom-[20px] sm:-bottom-[24px] md:-bottom-[32px] left-0 h-1 bg-[#044BB1] transition-all duration-500 ease-out ${
                pathname === '/BeritaBencana' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>

              <button
                onClick={() => router.push('/panduan')}
                className={`text-sm lg:text-xl font-light  transition-colors duration-200 relative group cursor-pointer ${
                pathname === '/panduan/prabencana' ? 'text-[#044BB1]' : 'text-gray-700 hover:text-[#044BB1]'
                }`}
              >
                Panduan
                <span className={`absolute -bottom-[20px] sm:-bottom-[24px] md:-bottom-[32px] left-0 h-1 bg-[#044BB1] transition-all duration-500 ease-out ${
                pathname === '/panduan/prabencana' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>
              </div>
            </div>

            <button
              onClick={() => router.push('/auth/login')}
              className="hidden md:flex cursor-pointer items-center space-x-1.5 px-4 lg:px-6 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all duration-300 group shrink-0"
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>

              <span className="text-xs lg:text-base font-medium whitespace-nowrap">Login Admin</span>
            </button>

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
              onClick={() => handleNavigation('/beranda')}
              className={`w-full text-left px-6 py-3 font-medium transition-colors duration-200 ${
                pathname === '/beranda' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavigation('/peta-page')}
              className={`w-full text-left px-6 py-3 font-medium transition-colors duration-200 ${
                pathname === '/peta-page' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Peta
            </button>

            <button
              onClick={() => handleNavigation('/EventListPage')}
              className={`w-full text-left px-6 py-3 font-medium transition-colors duration-200 ${
                pathname === '/EventListPage' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Event
            </button>

            <button
              onClick={() => handleNavigation('/BeritaBencana')}
              className={`w-full text-left px-6 py-3 font-medium transition-colors duration-200 ${
                pathname === '/BeritaBencana' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`} 
            >
              Berita 
            </button>

            <button
              onClick={() => handleNavigation('/panduan')}
              className={`w-full text-left px-6 py-3 font-medium transition-colors duration-200 ${
                pathname === '/panduan' ? 'bg-blue-50 text-[#044BB1] border-l-4 border-[#044BB1]' : 'text-gray-700 hover:bg-gray-50'
              }`} 
            >
              Panduan 
            </button>

            <div className="border-t border-gray-300 my-4"></div>

            <button
              onClick={() => handleNavigation('/auth/login')}
              className="w-full mx-4 flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all duration-300"
              style={{ width: 'calc(100% - 2rem)' }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Login Admin</span>
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