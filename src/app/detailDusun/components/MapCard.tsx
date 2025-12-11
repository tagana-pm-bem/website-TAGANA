"use client";

import dynamic from "next/dynamic";
import React from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Fix default marker icon
if (typeof window !== "undefined") {
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

interface Props {
  position: [number, number];
  dusunName: string;
  population: number;
  mapReady: boolean;
}

export default function MapCard({ position, dusunName, population, mapReady }: Props) {
  return (
    <>
      {mapReady && (
        <div className="bg-white rounded-2xl p-5 shadow-xl">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center text-base sm:text-lg">
            <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Tampilan Satelit
          </h3>
          <div className="h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner relative z-0">
            <MapContainer
              center={position}
              zoom={15}
              className="w-full h-full"
              scrollWheelZoom={false}
              zoomControl={true}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={18}
              />
              <Marker position={position}>
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-[#044BB1] text-lg">{dusunName}</p>
                    <p className="text-sm text-gray-600 mt-1">{population} jiwa</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
}
