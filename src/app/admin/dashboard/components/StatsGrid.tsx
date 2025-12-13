"use client";

import React from "react";
import { populationStats, dusunData } from "@/data/datadususn";
import { useDusun } from "@/hooks/useDusun.hooks";


export function StatsGrid() {
  const { statsSummary, isLoading } = useDusun();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-32 bg-gray-100 rounded-xl animate-pulse border border-gray-200" />
        ))}
      </div>
    )
  }
  const totalDusun = dusunData.length;
  const totalPopulation = populationStats.totalPopulation;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Berita</p>
            <h3 className="text-3xl font-bold text-gray-900">0</h3>
            <p className="text-xs text-green-600 mt-1">+12 bulan ini</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Penduduk</p>
            <h3 className="text-3xl font-bold text-gray-900">
              {statsSummary.totalPopulation.toLocaleString('id-ID')}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Data IKS 2025</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Jumlah Dusun</p>
            <h3 className="text-3xl font-bold text-gray-900">{statsSummary.totalDusun}</h3>
            <p className="text-xs text-gray-500 mt-1">Desa Sriharjo</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Event Mendatang</p>
            <h3 className="text-3xl font-bold text-gray-900">0</h3>
            <p className="text-xs text-orange-600 mt-1">3 minggu ini</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
