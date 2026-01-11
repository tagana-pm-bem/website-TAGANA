'use client';

import { useState, useEffect } from 'react';
import { InfoModal } from '@/components/ui/modal_desa';
import Controls from './components/Controls';
import MapArea from './components/MapArea';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDusunId, setSelectedDusunId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';

    return () => {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
    };
  }, []);

  const handleDusunChange = (
    e: React.ChangeEvent<HTMLSelectElement> | number | null
  ) => {
    if (typeof e === 'number' || e === null) {
      setSelectedDusunId(e);
    } else {
      const value = e.target.value;
      setSelectedDusunId(value === '' ? null : parseInt(value));
    }
  };

  const handleResetView = () => {
    setSelectedDusunId(null);
  };

  return (
    <>
      <main className="w-full min-h-screen bg-slate-50/50 pt-6 pb-8 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ===== SIDEBAR DESKTOP ===== */}
            <aside className="hidden lg:block w-full lg:w-100 shrink-0 sticky top-6">
              <Controls
                selectedDusunId={selectedDusunId}
                onDusunChange={handleDusunChange}
                onReset={handleResetView}
                onOpenInfo={() => setIsModalOpen(true)}
              />
            </aside>

            {/* ===== MAP AREA ===== */}
            <section className="flex-1 w-full flex flex-col gap-6 relative">

              {/* HAMBURGER BUTTON (MOBILE) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed top-24 left-8 z-50 bg-white rounded-xl p-3 shadow-lg border border-slate-100
                           transition-transform duration-300 ease-in-out active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="w-full max-h-screen rounded-xl overflow-hidden shadow-2xl shadow-slate-200 border border-white relative bg-white">
                <MapArea
                  selectedDusunId={selectedDusunId}
                  onDusunSelect={setSelectedDusunId}
                />
              </div>

            </section>
          </div>
        </div>
      </main>

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-500 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* BACKDROP */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ease-in-out
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* DRAWER PANEL */}
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl
            transform transition-transform duration-500 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-slate-800">Menu Wilayah</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100
                         transition-transform duration-300 ease-in-out active:rotate-90"
            >
              ✕
            </button>
          </div>

          <Controls
            selectedDusunId={selectedDusunId}
            onDusunChange={(e) => {
              handleDusunChange(e);
              setIsMobileMenuOpen(false);
            }}
            onReset={handleResetView}
            onOpenInfo={() => {
              setIsModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
      </div>

      {/* INFO MODAL */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
