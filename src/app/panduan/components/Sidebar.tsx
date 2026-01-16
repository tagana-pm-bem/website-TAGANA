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
  Menu,
  
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
    group: "TAHAPAN BENCANA",
    items: [
      { name: "Prabencana", href: "/panduan/prabencana", icon: <BookOpen size={18} /> },
      { name: "Saat Bencana", href: "/panduan/saat-bencana", icon: <AlertCircle size={18} /> },
      { name: "Pasca Bencana", href: "/panduan/pasca-bencana", icon: <Heart size={18} /> },
    ]
  },
  {
    group: "INFORMASI LAIN",
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
    <div className="space-y-4">
      {menuItems.map((group, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {group.group}
          </h3>
          <div className="space-y-4 p-2">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11 font-light text-base",
                    isActive && "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-medium"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="flex-1 text-left">{item.name}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
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
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="mt-11 border-2 border-gray-300 bg-gray-500 shadow-md hover:bg-gray-50 hover:border-gray-400"
            >
              <Menu size={20} className="text-gray-700" />
            </Button>
            </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>Menu Panduan</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-5rem)] py-6 px-3">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r fixed h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block">
        <ScrollArea className="h-full py-6 px-3">
          <SidebarContent />
        </ScrollArea>
      </aside>
    </>
  );
}