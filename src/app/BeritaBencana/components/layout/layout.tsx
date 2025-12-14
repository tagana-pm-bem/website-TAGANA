"use client";

import React from "react";
import { Header } from "./Header";
// import { FilterSide } from "./FIlterBerita";

interface LayoutProps {
  children: React.ReactNode;
  onFilterChange?: (filters: any) => void;
  onBack?: () => void;
}

export function Layout({ children, onFilterChange, onBack }: LayoutProps) {
return (
    <div className="bg-white min-h-screen w-full">
        <div className="w-full">
            <div className="flex gap-6 min-h-screen">
                    
                {/* Sidebar Filter
                <aside className="w-80 flex-shrink-0 pl-4 fixed">
                    <div className="sticky top-8">
                        <FilterSide onFilterChange={onFilterChange} />
                    </div>
                </aside> */}

                {/* Main Content */}
                <main className="w-7xl mx-auto mt-8 mb-8 px-4 ">
                    {children}
                </main>
            </div>
        </div>
    </div>
);
}
