"use client";

import React from "react";

interface DateFilter { start: string; end: string }

export function FilterPanel({
  show,
  toggleShow,
  searchQuery,
  setSearchQuery,
  categories,
  statuses,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  dateFilter,
  setDateFilter,
  resetFilters,
}: {
  show: boolean;
  toggleShow: () => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  categories: string[];
  statuses: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  dateFilter: DateFilter;
  setDateFilter: (v: DateFilter) => void;
  resetFilters: () => void;
}) {
  return (
    <div className="mb-8">
      <button
        onClick={toggleShow}
        className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 border border-gray-200"
      >
        <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="font-medium">Filter</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${show ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {show && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-4 animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Berita
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Berita</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berdasarkan judul, lokasi, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Bencana</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent">
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
              <input type="date" value={dateFilter.start} onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
              <input type="date" value={dateFilter.end} onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent" />
            </div>
          </div>

          <div className="mt-4">
            <button onClick={resetFilters} className="text-[#044BB1] hover:text-[#033a8c] font-medium flex items-center space-x-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Filter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
