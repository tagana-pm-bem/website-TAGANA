"use client";

import React from "react";
import { Users, UserCheck, UserX } from "lucide-react";
import { populationStats } from "@/data/datadususn";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Penduduk */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-700 mb-1">Total Penduduk</p>
            <p className="text-3xl font-bold text-blue-900">
              {populationStats.totalPopulation.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="bg-blue-500 rounded-full p-4">
            <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Laki-laki */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-green-700 mb-1">Laki-laki</p>
            <p className="text-3xl font-bold text-green-900">
              {populationStats.totalMale.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="bg-green-500 rounded-full p-4">
            <UserCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Perempuan */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-purple-700 mb-1">Perempuan</p>
            <p className="text-3xl font-bold text-purple-900">
              {populationStats.totalFemale.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="bg-purple-500 rounded-full p-4">
            <UserX className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
