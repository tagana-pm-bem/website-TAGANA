"use client";

import { useState } from "react"; // Tambahkan useState
import { Card } from "@/components/ui/card";
import PetaWilayah from "./components/petaWilayah";
import ManajemenRisiko from "./components/manajemenRisiko";
import PotensiBencana from "./components/potensiBencana";

export default function DataDusunPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-8 mb-25">
      <ManajemenRisiko onSuccess={handleDataChange} />

      <Card className="border-none shadow-sm rounded-[1.5rem] overflow-hidden">
        <PotensiBencana refreshTrigger={refreshKey} />
      </Card>
    </div>
  );
}
