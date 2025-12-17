'use client';

import { useState, useEffect } from 'react';
import { InfoModal } from '@/components/ui/modal_desa';
import Controls from './components/Controls';
import MapArea from './components/MapArea';
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
      {/* <style jsx global>{`
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
      `}</style> */}

      <div className="min-h-full bg-gray-50">
        <main className="pt-6 pb-8">
          <div className="w-full px-4 md:px-14 mx-auto  ">

            <Controls
              selectedDusunId={selectedDusunId}
              onDusunChange={handleDusunChange}
              onReset={handleResetView}
              onOpenInfo={() => setIsModalOpen(true)}
            />

            <MapArea selectedDusunId={selectedDusunId} onDusunSelect={setSelectedDusunId} />

            {/* <StatsCards /> */}

            <div className=" w-full   mx-auto my-8 ">
              <LegendCard />

            </div>

          </div>
        </main>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
