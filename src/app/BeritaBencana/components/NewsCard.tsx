"use client";

import React from "react";
import Image from "next/image";

export function NewsCard({ berita, getCategoryColor, getStatusColor, formatDate, onReadMore }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
          </svg>
        </div>
        <div className="absolute top-3 right-3">
          <div className={`${getStatusColor(berita.status)} px-3 py-1 rounded-full flex items-center space-x-1`}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-semibold">{berita.status}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(berita.category)}`}>
            {berita.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#044BB1] transition-colors">{berita.title}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{berita.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{berita.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(berita.date)} • {berita.time} WIB</span>
          </div>
        </div>

        {(berita.casualties || berita.damage) && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1">
            {berita.casualties && Object.keys(berita.casualties).length > 0 && (
              <div className="flex items-start text-xs">
                <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  {berita.casualties.meninggal && <span className="block text-red-700 font-semibold">Meninggal: {berita.casualties.meninggal}</span>}
                  {berita.casualties.lukaBerat && <span className="block text-orange-700 font-semibold">Luka Berat: {berita.casualties.lukaBerat}</span>}
                  {berita.casualties.lukaRingan && <span className="block text-yellow-700 font-semibold">Luka Ringan: {berita.casualties.lukaRingan}</span>}
                </div>
              </div>
            )}
            {berita.damage?.rumah && (
              <div className="flex items-center text-xs text-gray-700">
                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Rumah Rusak: {berita.damage.rumah} unit</span>
              </div>
            )}
          </div>
        )}

        <button onClick={() => onReadMore(berita.id)} className="w-full bg-[#044BB1] hover:bg-[#033a8c] text-white py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
          <span>Baca Selengkapnya</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
