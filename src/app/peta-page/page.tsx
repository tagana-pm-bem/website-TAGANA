'use client';

import { useState, useEffect } from 'react';
import { InfoModal } from '@/components/ui/modal_desa';
import Controls from './components/Controls';
import MapArea from './components/MapArea';
import StatsCards from './components/StatsCards';
import LegendCard from './components/LegendCard';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDusunId, setSelectedDusunId] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.style.overflowY = 'scroll';
    document.body.style.overflowY = 'scroll';
    
    return () => {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
    };
  }, []);

  const handleDusunChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDusunId(value === "" ? null : parseInt(value));
  };

  const handleResetView = () => {
    setSelectedDusunId(null);
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-y: scroll !important;
          -webkit-overflow-scrolling: touch;
        }
        
        ::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #044BB1;
          border-radius: 10px;
          border: 3px solid #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #033a8c;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #044BB1 #f1f1f1;
        }
        
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            border: 2px solid #f1f1f1;
          }
          
          html, body {
            overflow-y: scroll !important;
            height: 100%;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <main className="pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <Controls
              selectedDusunId={selectedDusunId}
              onDusunChange={handleDusunChange}
              onReset={handleResetView}
              onOpenInfo={() => setIsModalOpen(true)}
            />

            <MapArea selectedDusunId={selectedDusunId} onDusunSelect={setSelectedDusunId} />

            {/* <StatsCards /> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LegendCard />

              <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>Statistik Desa</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Dusun</span>
                    <span className="text-lg font-bold text-[#044BB1]">13</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Anggota TAGANA</span>
                    <span className="text-lg font-bold text-purple-600">20</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Penduduk</span>
                    <span className="text-lg font-bold text-orange-600">9.417</span>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </main>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
