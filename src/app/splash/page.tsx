"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Homepage() {
  const router = useRouter();
  const [counters, setCounters] = useState({
    volunteers: 0,
    missions: 0,
    provinces: 0,
  });

  useEffect(() => {
    const targets = { volunteers: 1000, missions: 500, provinces: 34 };
    const duration = 1200;
    const steps = 60;
    const stepDuration = duration / steps;

    (Object.keys(targets) as Array<keyof typeof targets>).forEach((key) => {
      let current = 0;
      const increment = targets[key] / steps;
      const timer = setInterval(() => {
        current += increment;
        setCounters((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
        if (current >= targets[key]) {
          setCounters((prev) => ({ ...prev, [key]: targets[key] }));
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center text-white text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gambar_desa1.jpeg"
          alt="Desa Sriharjo"
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="/gambar_desa1.jpeg"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <h1 className="text-5xl font-bold mb-4 sm:text-3xl">SRIHARJO</h1>
      <p className="text-lg mb-6 sm:text-base">
        Peta interaktif desa Sriharjo, menyediakan informasi lengkap mengenai potensi, fasilitas, dan demografi desa kami.
      </p>

      <div className="flex gap-4 flex-wrap mb-8 justify-center">
        <button
          className="cursor-pointer px-6 py-2 rounded-full bg-white text-green-800 font-semibold hover:bg-green-700 hover:text-white transition"
          onClick={() => router.push("/peta-page")}
        >
          Selengkapnya
        </button>
        <button
          className="cursor-pointer px-6 py-2 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-green-800 transition"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </button>
      </div>

      <div className="flex gap-8 flex-wrap justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{counters.volunteers}+</h3>
          <p>Total Penduduk</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold">{counters.missions}+</h3>
          <p>Lokasi</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold">{counters.provinces}</h3>
          <p>Provinsi</p>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
