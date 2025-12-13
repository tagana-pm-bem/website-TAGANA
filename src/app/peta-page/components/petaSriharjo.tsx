'use client';

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap, Polygon, LayersControl, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { InfoModal } from "@/components/ui/modal_desa";
import { desaBoundary } from "@/data/PetaSriharjoBoundary"; 
import { sriharjoKMLBoundaries } from "@/data/sriharjoKMLData";
import { sriharjoFloodBoundaries } from "@/data/zonabanjir";
import { dusunService, DusunDetailDB } from "@/services/dusunService";

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

function MapController({ selectedDusun, allDusun }: { selectedDusun: DusunDetailDB | null, allDusun: DusunDetailDB[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedDusun) {
      map.flyTo([selectedDusun.latitude, selectedDusun.longitude], 16, {
        duration: 1.5,
      });
    } else {
      if (allDusun.length > 0) {
        const avgLat = allDusun.reduce((sum, d) => sum + d.latitude, 0) / allDusun.length;
        const avgLng = allDusun.reduce((sum, d) => sum + d.longitude, 0) / allDusun.length;
        map.flyTo([avgLat, avgLng], 14, { duration: 1.5 });
      } else {
         map.flyTo([-7.942, 110.395], 14, { duration: 1.5 });
      }
    }
  }, [selectedDusun, map, allDusun]);

  return null;
}

interface Props {
  selectedDusunId: number | null;
  onDusunSelect: (id: number | null) => void;
}

export default function PetaSriharjo({ selectedDusunId, onDusunSelect }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State Data Dusun dari DB
  const [dusunList, setDusunList] = useState<DusunDetailDB[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dusunService.getAll(); 
        setDusunList(data as any[]); 
      } catch (err) {
        console.error("Gagal load peta:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedDusun = useMemo(() => {
    return dusunList.find(d => d.id === selectedDusunId) || null;
  }, [dusunList, selectedDusunId]);

  const getMarkerColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue'; 
      default: return 'blue';
    }
  };

  const handleDetailClick = (id: number) => {
    router.push(`/detailDusun?id=${id}`);
  };

  if (loading) {
    return <div className="h-full w-full flex items-center justify-center bg-gray-100">Memuat Peta...</div>;
  }

  return (
    <>
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 10;
        }
        /* Style Popup Leaflet Custom */
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          padding: 0;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 280px !important;
        }
      `}</style>

      <InfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <MapContainer
        center={[-7.942, 110.395]} 
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full rounded-xl overflow-hidden shadow-inner"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelit (Esri)">
            <TileLayer
              attribution='Tiles &copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <MapController selectedDusun={selectedDusun} allDusun={dusunList} />

        <Polygon
          positions={desaBoundary}
          pathOptions={{ color: '#044BB1', weight: 3, fillOpacity: 0.05, dashArray: '5, 5' }}
        />

        {Array.isArray(sriharjoKMLBoundaries) && sriharjoKMLBoundaries.map((boundary, idx) => (
           <Polygon
             key={`kml-${idx}`}
             positions={boundary.coordinates || []}
             pathOptions={{
               color: boundary.color || '#3388ff',
               weight: 2,
               fillOpacity: 0.1
             }}
           >
             <Tooltip sticky>{boundary.name}</Tooltip>
           </Polygon>
        ))}

        {Array.isArray(sriharjoFloodBoundaries) && sriharjoFloodBoundaries.map((flood, idx) => (
          <Polygon
            key={`flood-${idx}`}
            positions={flood.coordinates || []} 
            pathOptions={{
              color: 'red',
              weight: 0, 
              fillColor: '#ef4444',
              fillOpacity: 0.3
            }}
          >
             <Tooltip sticky>Zona Rawan Banjir</Tooltip>
          </Polygon>
        ))}

        {dusunList.map((dusun) => (
          <Marker
            key={dusun.id}
            position={[dusun.latitude || 0, dusun.longitude || 0]}
            eventHandlers={{
              click: () => onDusunSelect(dusun.id),
            }}
          >
            <Popup className="custom-popup">
               <div className="flex flex-col">
                  {/* Header Popup */}
                  <div className="bg-[#044BB1] text-white p-3">
                    <h3 className="font-bold text-lg">{dusun.nama}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase bg-white/20`}>
                        {dusun.level_resiko || 'Medium'} Risk
                      </span>
                    </div>
                  </div>
                  
                  {/* Body Popup */}
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                      <div className="text-gray-500">Populasi</div>
                      <div className="font-semibold text-right">{dusun.jumlah_penduduk || 0} Jiwa</div>
                      
                      <div className="text-gray-500">Kepala Keluarga</div>
                      <div className="font-semibold text-right">{dusun.jumlah_kk || 0} KK</div>
                    </div>

                    <button
                      onClick={() => handleDetailClick(dusun.id)}
                      className="w-full bg-[#044BB1] hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      Lihat Detail
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
               </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </>
  );
}