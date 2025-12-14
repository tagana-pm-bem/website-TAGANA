"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Sesuaikan path import ini

export interface DemographicStats {
  totalPenduduk: number;
  totalKK: number;
  lakiLaki: number;
  perempuan: number;
  balita: number;
  lansia: number;
  ibuHamil: number;
  disabilitas: number;
  miskin: number;
  dewasa: number;
  persenBalita: number;
  persenDewasa: number;
  persenLansia: number;
  kepadatan: number;
  isLoading: boolean;
}

export function useDemographics() {
  const [stats, setStats] = useState<DemographicStats>({
    totalPenduduk: 0,
    totalKK: 0,
    lakiLaki: 0,
    perempuan: 0,
    balita: 0,
    lansia: 0,
    ibuHamil: 0,
    disabilitas: 0,
    miskin: 0,
    dewasa: 0,
    persenBalita: 0,
    persenDewasa: 0,
    persenLansia: 0,
    kepadatan: 0,
    isLoading: true,
  });

  useEffect(() => {
    async function fetchDemographics() {
      try {
        const { data: dusunList, error } = await supabase
          .from("dusun")
          .select("*");

        if (error) throw error;

        if (dusunList) {
          const totalPenduduk = dusunList.reduce((sum, d) => sum + (d.jumlah_penduduk || 0), 0);
          const totalKK = dusunList.reduce((sum, d) => sum + (d.jumlah_kk || 0), 0);
          const lakiLaki = dusunList.reduce((sum, d) => sum + (d.jumlah_laki_laki || 0), 0);
          const perempuan = dusunList.reduce((sum, d) => sum + (d.jumlah_perempuan || 0), 0);
          const balita = dusunList.reduce((sum, d) => sum + (d.jumlah_balita || 0), 0);
          const lansia = dusunList.reduce((sum, d) => sum + (d.jumlah_lansia || 0), 0);
          const ibuHamil = dusunList.reduce((sum, d) => sum + (d.jumlah_ibu_hamil || 0), 0);
          const disabilitas = dusunList.reduce((sum, d) => sum + (d.jumlah_disabilitas || 0), 0);
          const miskin = dusunList.reduce((sum, d) => sum + (d.jumlah_miskin || 0), 0);

          const dewasa = totalPenduduk - balita - lansia;
          const safeTotal = totalPenduduk > 0 ? totalPenduduk : 1;
          
          const persenBalita = Math.round((balita / safeTotal) * 100);
          const persenLansia = Math.round((lansia / safeTotal) * 100);
          const persenDewasa = 100 - persenBalita - persenLansia;

          const luasWilayah = 502.36; 
          const kepadatan = Math.round(totalPenduduk / luasWilayah);

          setStats({
            totalPenduduk,
            totalKK,
            lakiLaki,
            perempuan,
            balita,
            lansia,
            ibuHamil,
            disabilitas,
            miskin,
            dewasa,
            persenBalita,
            persenDewasa,
            persenLansia,
            kepadatan,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching demographics:", error);
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    }

    fetchDemographics();
  }, []);

  return stats;
}