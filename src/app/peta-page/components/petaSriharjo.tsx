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
        /* Sembunyikan watermark Leaflet */
        .leaflet-control-attribution {
          display: none !important;
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
          resetTrigger={resetTrigger}
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
            desaBoundary.map(
              (coord) => [coord[0], coord[1]] as [number, number]
            ),
          ]}
          pathOptions={{
            color: "#FFFFFF",
            weight: 3,
            fillColor: "#1B211A",
            fillOpacity: 0.5, // Sesuaikan tingkat kegelapan (0-1)
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
                    opacity: 0.4,

                    fillColor: "#ef4444",
                    fillOpacity: 0.4,
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
                      strokeWidth="currentColor"
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
        <div className="absolute bottom-4 left-4 z-[1000] flex flex-col gap-2">
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
        <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
          <button
            onClick={handleResetView}
            className="px-3 py-3 rounded-2xl shadow-lg font-bold  text-[15px] transition-all bg-white flex items-center gap-2"
            title="Reset ke tampilan awal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="blue"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
          </button>
        </div>
      </MapContainer>
    </>
  );
}
