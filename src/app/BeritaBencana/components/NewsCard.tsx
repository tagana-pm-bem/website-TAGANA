"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin, ImageIcon } from "lucide-react";
import { getKategoriStyle } from "../constants";

interface NewsCardProps {
  berita: {
    id: string; 
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
    location?: string;
    status?: string; 
  };
  formatDate: (date: string) => string;
  onReadMore: (id: string) => void;
}

export function NewsCard({
  berita,
  formatDate,
  onReadMore,
}: NewsCardProps) {
  
  const style = getKategoriStyle(berita.category);

  return (
    <Card
      className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group p-0"
      onClick={() => onReadMore(berita.id)}
    >
      {/* Image */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden m-0">
        {berita.image ? (
          <Image
            src={berita.image}
            alt={berita.title}
            fill
            className="object-cover "
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <ImageIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}

        <div className="absolute top-3 left-3">
          <Badge className={`shadow-md backdrop-blur-sm ${style.badge}`}>
            {berita.category}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant={berita.status === 'published' ? 'default' : 'secondary'} className="shadow-md">
            {berita.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <h3 className="text-xl font-medium text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {berita.title}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
          {berita.description}
        </p>

        <div className="flex items-center justify-between pt-2 py-3 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={berita.date}>{formatDate(berita.date)}</time>
          </div>

          {berita.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1 max-w-25">{berita.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}