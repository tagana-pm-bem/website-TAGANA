"use client";

import Image from "next/image";
import React from "react";

export function AuthMobileBackground() {
  return (
    <div className="lg:hidden fixed inset-0 z-0">
      <Image
        src="/assets/backgroundmobile.png"
        alt="Background Mobile"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay untuk membuat konten lebih terbaca */}
      <div className="absolute inset-0 bg-gray-600/10 backdrop-blur-sm" />
    </div>
  );
}