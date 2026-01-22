"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/Button";
import { BookOpen, AlertCircle, Heart, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navigationData: NavigationItem[] = [
  { 
    name: "Prabencana", 
    href: "/panduan/prabencana", 
    icon: <BookOpen size={16} />
  },
  { 
    name: "Saat Bencana", 
    href: "/panduan/saat-bencana", 
    icon: <AlertCircle size={16} />
  },
  { 
    name: "Pasca Bencana", 
    href: "/panduan/pasca-bencana", 
    icon: <Heart size={16} />
  },
  { 
    name: "Nomor Darurat", 
    href: "/panduan/nomor-darurat", 
    icon: <Phone size={16} />
  },
];

export default function NavigasiButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-wrap gap-6 py-10 justify-center">
        {navigationData.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => router.push(item.href)}
              className={cn(

                isActive 
                  ? "bg-blue-500 text-blue-600 border-blue-500 hover:bg-blue-600" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
