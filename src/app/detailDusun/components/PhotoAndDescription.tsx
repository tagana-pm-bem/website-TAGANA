"use client";

import Image from "next/image";
import React from "react";

interface Props {
  dusunName: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  population: number;
}

export default function PhotoAndDescription({
  dusunName,
  description,
  imageUrl,
  imageAlt,
  population,
}: Props) {
  return (
    <div className="relative bg-white shadow-md overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Photo Container */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={1200}
            height={800}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80";
            }}
            priority
            unoptimized
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                {dusunName}
              </h2>
            </div>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl drop-shadow-md">
              Dusun dengan populasi {population} jiwa
            </p>
          </div>
        </div>

        {/* Description Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-100 via-white to-blue-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-100 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full -ml-12 -mb-12"></div>

            <div className="relative">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-xl p-3 flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-xl sm:text-2xl mb-3 flex items-center">
                    Tentang Dusun
                    <span className="ml-2 inline-block w-12 h-1 bg-gradient-to-r from-[#044BB1] to-transparent rounded-full"></span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
