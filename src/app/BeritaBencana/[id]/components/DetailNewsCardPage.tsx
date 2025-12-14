"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LikePage } from "../components/Likepage";

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
    imageUrl?: string;
    content: string[];
    location?: string;
  };
  onBack?: () => void;
}

export function DetailNewsCardPage({ berita, onBack }: DetailNewsCardPageProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Banjir: "bg-blue-100 text-blue-800",
      Longsor: "bg-amber-100 text-amber-800",
      Gempa: "bg-red-100 text-red-800",
      "Angin Puting Beliung": "bg-purple-100 text-purple-800",
      Kebakaran: "bg-orange-100 text-orange-800",
      Lainnya: "bg-gray-100 text-gray-800",
      Wisata: "bg-green-100 text-green-800",
      Event: "bg-blue-100 text-blue-800",
      Desa: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white max-w-5xl mx-auto shadow-2xl rounded-lg ">
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <span>›</span>
          <Link href="/kategori" className="hover:text-blue-600 transition-colors">
            Kategori
          </Link>
          <span>›</span>
          <span className="text-blue-600 font-medium">{berita.category}</span>
        </nav>

        {/* Category Badge */}
        <div className="mb-3 md:mb-4">
          <span
            className={`inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-semibold ${getCategoryColor(
              berita.category
            )}`}
          >
            {berita.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          {berita.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            {berita.author.avatar ? (
              <Image
                src={berita.author.avatar}
                alt={berita.author.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-semibold text-sm md:text-base">
                {berita.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm md:text-base text-gray-900">{berita.author.name}</p>
            <p className="text-xs md:text-sm text-gray-500">
              {berita.date} • {berita.readTime}
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-96 mb-6 md:mb-8 rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
          {berita.imageUrl ? (
            <Image
              src={berita.imageUrl}
              alt={berita.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full">
              <Image
                src="/placeholder-landscape.jpg"
                alt={berita.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Content */}
        <article className="prose prose-sm md:prose-lg max-w-none">
          {berita.content.map((paragraph, index) => (
            <p key={index} className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Back Button */}
        {onBack && (
          <div className="mt-8 md:mt-12">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Kembali ke Daftar Berita</span>
            </button>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4">
        <LikePage
          initialLikes={100}
          initialComments={4}
          onLike={() => console.log("Liked")}
          onComment={() => console.log("Comment")}
          onShare={() => console.log("Share")}
        />
      </div>
      </div>
    </div>
  );
}
