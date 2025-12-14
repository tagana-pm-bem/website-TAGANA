"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
  Polygon,
  LayersControl,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { InfoModal } from "@/components/ui/modal_desa";
import { desaBoundary } from "@/data/PetaSriharjoBoundary";
import {
  sriharjoKMLBoundaries,
  sriharjoKMLBoundariesArray,
} from "@/data/sriharjoKMLData";
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

function MapController({
  selectedDusun,
  allDusun,
  resetTrigger, // 👈 Tambahkan prop baru
}: {
  selectedDusun: DusunDetailDB | null;
  allDusun: DusunDetailDB[];
  resetTrigger?: number; // 👈 Tambahkan prop baru
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedDusun) {
      map.flyTo([selectedDusun.latitude, selectedDusun.longitude], 16, {
        duration: 1.5,
      });
    } else {
      // 👇 Auto-fit ke batas desa saat tidak ada dusun terpilih
      if (desaBoundary && desaBoundary.length > 0) {
        const bounds = L.latLngBounds(desaBoundary as any);
        map.fitBounds(bounds, {
          padding: [50, 50], // Padding agar tidak terlalu mepet
          duration: 1.5,
        });
      } else if (allDusun.length > 0) {
        const avgLat =
          allDusun.reduce((sum, d) => sum + d.latitude, 0) / allDusun.length;
        const avgLng =
          allDusun.reduce((sum, d) => sum + d.longitude, 0) / allDusun.length;
        map.flyTo([avgLat, avgLng], 14, { duration: 1.5 });
      }
    }
  }, [selectedDusun, map, allDusun, resetTrigger]); // 👈 Tambahkan resetTrigger ke dependency

  return null;
}

// Tambahkan fungsi helper di luar component
function getCenterFromBounds(coordinates: [number, number][]) {
  if (!coordinates || coordinates.length === 0) return [-7.942, 110.395];

  const lats = coordinates.map((coord) => coord[0]);
  const lngs = coordinates.map((coord) => coord[1]);

  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  return [centerLat, centerLng];
}

interface Props {
  selectedDusunId: number | null;
  onDusunSelect: (id: number | null) => void;
}

export default function PetaSriharjo({
  selectedDusunId,
  onDusunSelect,
}: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State Data Dusun dari DB
  const [dusunList, setDusunList] = useState<DusunDetailDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFloodZones, setShowFloodZones] = useState(false);
  const [showRTBoundaries, setShowRTBoundaries] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // 👈 Tambahkan state untuk trigger reset

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
    return dusunList.find((d) => d.id === selectedDusunId) || null;
  }, [dusunList, selectedDusunId]);

  const handleDetailClick = (id: number) => {
    router.push(`/detailDusun?id=${id}`);
  };

  const mapCenter = useMemo(() => {
    if (desaBoundary && desaBoundary.length > 0) {
      return getCenterFromBounds(desaBoundary as [number, number][]);
    }
    return [-7.942, 110.395];
  }, []);

  // 👇 Fungsi untuk reset peta
  const handleResetView = () => {
    onDusunSelect(null); // Clear selected dusun
    setResetTrigger((prev) => prev + 1); // Trigger MapController useEffect
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        Memuat Peta...
      </div>
    );
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
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 280px !important;
        }
      `}</style>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <MapContainer
        center={mapCenter as [number, number]}
        zoom={14}
        minZoom={12}
        maxZoom={18}
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full rounded-xl overflow-hidden shadow-inner"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satelit (Esri)">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <MapController
          selectedDusun={selectedDusun}
          allDusun={dusunList}
          resetTrigger={resetTrigger} // 👈 Pass resetTrigger
        />

        {/*-- batas peta --*/}
       <Polygon
          positions={[
            // Outer boundary (dunia)
            [
              [-90, -180],
              [-90, 180],
              [90, 180],
              [90, -180],
              [-90, -180],
            ],
            // Inner boundary (batas desa - akan menjadi "hole")
            desaBoundary.map(coord => [coord[0], coord[1]] as [number, number]),
          ]}
          pathOptions={{
            color: "#FFFFFF",
            weight: 3,
            fillColor: "#000000",
            fillOpacity: 0.3, // Sesuaikan tingkat kegelapan (0-1)
            dashArray: "5, 5",
          }}
        />

        {/*-- batas rt dan dusun--*/}
        {showRTBoundaries &&
          Array.isArray(sriharjoKMLBoundariesArray) &&
          sriharjoKMLBoundariesArray.map((boundary, idx) => (
            <Polyline
              key={`kml-${idx}`}
              positions={boundary.coordinates || []}
              pathOptions={{
                color: boundary.color || "#3388ff",
                weight: 2,
                opacity: 0.7,
              }}
            >
              <Tooltip sticky>{boundary.name}</Tooltip>
            </Polyline>
          ))}

        {/*-- zona banjir --*/}
        {showFloodZones &&
          Array.isArray(sriharjoFloodBoundaries) &&
          sriharjoFloodBoundaries.map((item, idx) => {
            if (item.type === "floodZone") {
              return (
                <Polygon
                  key={`flood-${idx}`}
                  positions={item.coordinates || []}
                  pathOptions={{
                    color: "#ef4444",
                    weight: 2,
                    opacity: 0.2,

                    fillColor: "#ef4444",
                    fillOpacity: 0.2,
                  }}
                >
                  <Tooltip sticky>{item.name}</Tooltip>
                </Polygon>
              );
            } else if (item.type === "road") {
              return (
                <Polyline
                  key={`road-${idx}`}
                  positions={item.coordinates || []}
                  pathOptions={{
                    color: "#FFE52A",
                    weight: 3,
                    opacity: 1,
                  }}
                >
                  {/* <Tooltip sticky>{item.name}</Tooltip> */}
                </Polyline>
              );
            }
            return null;
          })}

        {dusunList.map((dusun) => (
          <Marker
            key={dusun.id}
            position={[dusun.latitude || 0, dusun.longitude || 0]}
            eventHandlers={{
              click: () => onDusunSelect(dusun.id),
            }}
          >
            <Tooltip sticky>{dusun.nama}</Tooltip>
            <Popup className="custom-popup">
              <div className="flex flex-col">
                {/* Header Popup */}
                <div className="bg-[#044BB1] text-white p-3">
                  <h3 className="font-bold text-lg">{dusun.nama}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase bg-white/20`}
                    >
                      {dusun.level_resiko || "Medium"} Risk
                    </span>
                  </div>
                </div>

                {/* Body Popup */}
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                    <div className="text-gray-500">Populasi</div>
                    <div className="font-semibold text-right">
                      {dusun.jumlah_penduduk || 0} Jiwa
                    </div>

                    <div className="text-gray-500">Kepala Keluarga</div>
                    <div className="font-semibold text-right">
                      {dusun.jumlah_kk || 0} KK
                    </div>
                  </div>

                  <button
                    onClick={() => handleDetailClick(dusun.id)}
                    className="w-full bg-[#044BB1] hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    Lihat Detail
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Kontrol Show/Hide */}
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
          {/* 👇 Tombol Reset View */}

          <button
            onClick={() => setShowFloodZones(!showFloodZones)}
            className={`px-4 py-2 rounded-lg shadow-lg font-medium transition-all text-[15px] ${
              showFloodZones
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {showFloodZones ? "Zona Banjir" : "Zona Banjir"}
          </button>

          <button
            onClick={() => setShowRTBoundaries(!showRTBoundaries)}
            className={`px-4 py-2 rounded-lg shadow-lg font-medium transition-all text-[15px] ${
              showRTBoundaries
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {showRTBoundaries ? "Batas RT" : "Batas RT"}
          </button>
        </div>

        {/* Kontrol Reset View */}
        <div className="absolute bottom-10 right-4 z-[1000] flex flex-col gap-2">
          <button
            onClick={handleResetView}
            className="px-5 py-3 rounded-2xl shadow-lg font-bold  text-[15px] transition-all bg-white flex items-center gap-2"
            title="Reset ke tampilan awal"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor "
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            
          </button>
        </div>
      </MapContainer>
    </>
  );
}
