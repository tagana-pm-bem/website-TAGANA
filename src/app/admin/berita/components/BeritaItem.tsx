"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

interface BeritaItemProps {
  id: number;
  title: string;
  date: string;
  status: "published" | "draft";
  image?: string;
}

export function BeritaItem({ id, title, date, status, image }: BeritaItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{date}</p>
          <div className="mt-3">
            {status === "published" ? (
              <Badge type="success" message="Dipublikasikan" />
            ) : (
              <Badge type="error" message="Draft" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
