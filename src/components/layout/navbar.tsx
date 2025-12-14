"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { InfoModal } from '@/components/ui/modal_desa';
import Image from "next/image";

export function Navbar() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Update the last update time
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

  

  

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-2xl border-b-2" : "shadow-lg border-b-4"
        } border-[#2e68b8ab]`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
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

            {/* EVENT DAN BERITA*/}
            
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
              Berita Bencana
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#044BB1] transition-all duration-300 ${
                pathname === '/BeritaBencana' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
              </button>
            </div>




            {/* Right side - Navigation Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
              {/* Login Button */}
                <button
                onClick={() => router.push('/auth/login')}
                className="flex cursor-pointer items-center space-x-0.5 sm:space-x-1 md:space-x-1.5 px-2 sm:px-2.5 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-md sm:rounded-lg hover:shadow-lg  active:scale-95 transition-all duration-300 group"
                >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold whitespace-nowrap">login</span>
                </button>

              {/* Info Button */}
              {/* <button
                onClick={() => setInfoModalOpen(true)}
                className="flex cursor-pointer items-center space-x-0.5 sm:space-x-1 md:space-x-1.5 px-2 sm:px-2.5 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white rounded-md sm:rounded-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl font-extrabold leading-none group-hover:scale-110 transition-transform flex-shrink-0">
                  !
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold whitespace-nowrap">Tentang Desa</span>
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Info Modal */}
      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
      />
    </>
  );
}
