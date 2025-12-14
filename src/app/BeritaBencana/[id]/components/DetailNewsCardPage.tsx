"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LikePage } from "./Likepage"; 

interface DetailNewsCardPageProps {
  berita: {
    id: string;
    title: string;
    category: string;
    author: {
      name: string;
      avatar?: string;
    };
    date: string;
    readTime: string;
    imageUrl?: string | null;
    content: string; 
    location?: string | null;
  };
  onBack?: () => void;
}

export function DetailNewsCardPage({
  berita,
  onBack,
}: DetailNewsCardPageProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Banjir: "bg-blue-100 text-blue-800",
      Longsor: "bg-amber-100 text-amber-800",
      Gempa: "bg-red-100 text-red-800",
      Kebakaran: "bg-orange-100 text-orange-800",
      Wisata: "bg-green-100 text-green-800",
      Desa: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white max-w-5xl mx-auto shadow-2xl rounded-lg my-8">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/admin/berita" className="hover:text-blue-600 transition-colors">
            Berita
          </Link>
          <span>›</span>
          <span className="text-blue-600 font-medium">{berita.category}</span>
        </nav>

        <div className="mb-4">
          <span className={`inline-block px-4 py-1.5 rounded-md text-sm font-semibold ${getCategoryColor(berita.category)}`}>
            {berita.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {berita.title}
        </h1>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
             {berita.author.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{berita.author.name}</p>
            <p className="text-sm text-gray-500">
              {berita.date} • {berita.readTime}
            </p>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden bg-gray-100 shadow-md">
          {berita.imageUrl ? (
            <Image
              src={berita.imageUrl}
              alt={berita.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
               <svg className="w-20 h-20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" /></svg>
               <span>Tidak ada gambar</span>
            </div>
          )}
        </div>

        {/* --- FIXED: Added Arbitrary Variants for Rich Text Styling --- */}
        <article className="
          text-gray-800 leading-relaxed
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4
          [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
          [&_li]:mb-1
          [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4
          [&_strong]:font-bold
          [&_em]:italic
        ">
            <div dangerouslySetInnerHTML={{ __html: berita.content }} />
        </article>

        {onBack && (
          <div className="mt-12 border-t pt-6">
            <button
              onClick={onBack}
              className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <span>← Kembali ke Daftar Berita</span>
            </button>
          </div>
        )}

        <div className="mt-10 border-t pt-8">
          <LikePage beritaId={berita.id} />
        </div>
      </div>
    </div>
  );
}