"use client";
import EventListpage from "./components/EventListpage";
import { useState } from "react";
import Filterevent from "./components/Filterevent";

export default function KalenderPage() {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="p-6">
            {/* Header dengan Judul dan Tombol Filter */}
            <div className="flex justify-between items-center mb-6 p-3  flex-row gap-3">
                <h1 className="text-2xl font-bold">Kalender Event</h1>
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {showFilter ? "Tutup Filter" : "Filter Event"}
                </button>
            </div>

            {showFilter && <Filterevent onFilterChange={(filters) => {
                console.log("Filters applied:", filters);
            }} />}

            <EventListpage />

            <div>
                {/* Pagination Component can be added here if needed */}
            </div>
        </div>
    );
}
