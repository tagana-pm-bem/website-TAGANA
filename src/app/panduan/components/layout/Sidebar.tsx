"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  AlertCircle, 
  Heart, 
  Phone, 
  MapPin,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
  {
    group: "Tahapan Bencana",
    items: [
      { name: "Prabencana", href: "/panduan/prabencana", icon: <BookOpen size={18} /> },
      { name: "Saat Bencana", href: "/panduan/saat-bencana", icon: <AlertCircle size={18} /> },
      { name: "Pasca Bencana", href: "/panduan/pasca-bencana", icon: <Heart size={18} /> },
    ]
  },
  {
    group: "Informasi Lain",
    items: [
      { name: "Nomor Darurat", href: "/panduan/nomor-darurat", icon: <Phone size={18} /> },
      { name: "Lokasi Evakuasi", href: "/panduan/lokasi-evakuasi", icon: <MapPin size={18} /> },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-6">
      {menuItems.map((group, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="px-4 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">
            {group.group}
          </h3>
          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-4 h-12 px-4 rounded-2xl transition-all duration-200",
                    "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                    isActive && "bg-blue-50 text-[#044BB1] hover:bg-blue-100/50 hover:text-[#044BB1] font-medium shadow-sm ring-1 ring-blue-100/50"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>
                    <div className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      isActive ? "bg-white text-[#044BB1] shadow-sm" : "bg-transparent"
                    )}>
                      {item.icon}
                    </div>
                    <span className="flex-1 text-sm">{item.name}</span>
                    {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl mt-10 shadow-lg border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all"
            >
              <Menu size={20} className="text-slate-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-none rounded-r-[2rem]">
            <SheetHeader className="px-8 py-8 border-b border-slate-50 ">
              <SheetTitle className="text-left font-medium text-slate-900">Menu Panduan</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] py-6 px-4">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - Fixed position dengan style floating */}
      <aside className="w-72 hidden lg:block">
        <div className="h-[calc(100vh-4rem)] sticky top-8 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
          <ScrollArea className="h-full py-8 px-4">
            <SidebarContent />
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}