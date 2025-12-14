"use client";

import { useState } from "react";
import AddEvent from "./components/addEvent";
import Agenda from "./components/agenda";

export default function KalenderPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row gap-8 w-full mb-[100px]">
      <div className="h-full w-full">
        <AddEvent onSuccess={handleRefresh} />
      </div>

      <div className="h-full w-full">
        <Agenda refreshTrigger={refreshKey} />
      </div>
    </div>
  );
}