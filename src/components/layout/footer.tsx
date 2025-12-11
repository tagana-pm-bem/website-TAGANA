"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // const developers = [
  //   {
  //     name: "Naufal Adna",
  //     role: "mapper & Backend Developer",
  //     initial: "N",
  //     color: "from-indigo-500 to-indigo-600",
  //   },
  //   {
  //     name: "Sagara",
  //     role: "Layout Designer",
  //     initial: "S",
  //     color: "from-cyan-500 to-cyan-600",
  //   },
  //   {
  //     name: "Heri",
  //     role: "Frontend Developer",
  //     initial: "H",
  //     color: "from-blue-500 to-blue-600",
  //   },
  // ];

  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {currentYear} Desa Sriharjo. All rights reserved.</div>
        <div className="flex items-center gap-3">
          {/* {developers.map((dev) => (
            <div key={dev.name} className={`flex items-center gap-2 px-2 py-1 rounded-md bg-gradient-to-r ${dev.color} text-white`}>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">{dev.initial}</div>
              <div className="text-xs leading-tight">
                <div className="font-semibold text-white text-[11px]">{dev.name}</div>
                <div className="text-[10px] text-white/90">{dev.role}</div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </footer>
  );
}
