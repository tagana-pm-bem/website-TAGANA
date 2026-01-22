"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemographics } from "@/hooks/useDemographics";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Users, Home, TrendingUp, MapPin, ArrowRight } from "lucide-react";

function Homepage() {
  const router = useRouter();
  const { totalPenduduk, totalKK, isLoading } = useDemographics();

  const [counters, setCounters] = useState({
    volunteers: 0, 
    missions: 0,   
  });

  useEffect(() => {
    if (isLoading) return;

    const targets = { 
      volunteers: totalPenduduk, 
      missions: totalKK,         
    };
    
    const duration = 1200;
    const steps = 50;
    const stepDuration = duration / steps;

    const timers: NodeJS.Timeout[] = [];

    (Object.keys(targets) as Array<keyof typeof targets>).forEach(key => {
      let current = 0;
      const targetValue = targets[key];
      
      if (targetValue === 0) {
        setCounters(prev => ({ ...prev, [key]: 0 }));
        return;
      }

      const increment = targetValue / steps;
      
      const timer = setInterval(() => {
        current += increment;
        
        setCounters(prev => {
          const nextVal = Math.floor(current);
          if (nextVal >= targetValue) {
            return { ...prev, [key]: targetValue };
          }
          return { ...prev, [key]: nextVal };
        });

        if (current >= targetValue) {
          clearInterval(timer);
        }
      }, stepDuration);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };

  }, [isLoading, totalPenduduk, totalKK]); 

  const handlePelajariClick = () => {
    router.push('/beranda');
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="/assets/bgsplash.png"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/60 to-emerald-900/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Badge */}
        <Badge 
          variant="secondary" 
          className="mb-8 bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-normal hover:bg-white/30 transition-colors"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Sistem Informasi Desa
        </Badge>

        {/* Hero Title */}
        <div className="text-center mb-8 max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            SRIHARJO
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Peta interaktif desa Sriharjo, menyediakan informasi lengkap mengenai potensi, fasilitas, dan demografi desa kami.
          </p>
        </div>

        {/* Stats Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
            {/* Total Penduduk Card */}
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-600 text-sm mb-2">Total Penduduk</p>
                <h3 className="text-4xl font-bold text-emerald-700">
                  {counters.volunteers.toLocaleString('id-ID')}
                </h3>
                <p className="text-xs text-gray-500 mt-2">Jiwa</p>
              </CardContent>
            </Card>

            {/* Kepala Keluarga Card */}
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-600 text-sm mb-2">Kepala Keluarga</p>
                <h3 className="text-4xl font-bold text-emerald-700">
                  {counters.missions.toLocaleString('id-ID')}
                </h3>
                <p className="text-xs text-gray-500 mt-2">KK</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handlePelajariClick}
          className="group bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Selengkapnya
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Footer Text */}
        <p className="text-white/70 text-sm mt-8 text-center">
          Jelajahi informasi lengkap tentang Desa Sriharjo
        </p>
      </div>
    </main>
  );
}

export default Homepage;