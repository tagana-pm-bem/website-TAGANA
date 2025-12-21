"use client";

import React, { useState, useEffect } from "react";
import { CommentPage } from "./CommentCard"; 
import { interactionService } from "@/services/interactionService"; 

interface LikePageProps {
  beritaId: string;
  initialLikes?: number;
}

export function LikePage({ beritaId, initialLikes = 0 }: LikePageProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countLike = await interactionService.getLikeCount(beritaId);
        setLikes(countLike);

        const likedStatus = await interactionService.checkIsLiked(beritaId);
        setIsLiked(likedStatus);

        const comments = await interactionService.getComments(beritaId);
        setTotalComments(comments.length);
      } catch (error) {
        console.error("Error fetching interactions:", error);
      }
    };
    if(beritaId) fetchData();
  }, [beritaId]);

  const handleLike = async () => {
    try {
      const prevLiked = isLiked;
      setIsLiked(!prevLiked);
      setLikes(prevLiked ? likes - 1 : likes + 1);

      await interactionService.toggleLike(beritaId);
    } catch (error: any) {
      alert(error.message || "Gagal menyukai berita");
      // Revert UI if needed
      setIsLiked(!isLiked); 
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin!");
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div className="w-full">
      {/* Container: Flex di desktop, Grid di mobile agar tombol rata & mudah ditekan */}
      <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:space-x-4 py-4 border-t border-gray-100 mt-6">
      
      {/* Tombol Like */}
      <button
        onClick={handleLike}
        className={`
        flex items-center justify-center space-x-1.5 sm:space-x-2 
        px-3 py-2 sm:px-4 sm:py-2 rounded-full border transition-all duration-200
        text-xs sm:text-sm
        ${
          isLiked
          ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        }
        `}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="font-medium whitespace-nowrap">{formatNumber(likes)} <span className="hidden sm:inline">Suka</span></span>
      </button>

      {/* Tombol Komentar */}
      <button
        onClick={() => setShowComments(!showComments)}
        className={`
        flex items-center justify-center space-x-1.5 sm:space-x-2 
        px-3 py-2 sm:px-4 sm:py-2 rounded-full border transition-all duration-200
        text-xs sm:text-sm
        ${
          showComments 
          ? "bg-blue-50 border-blue-200 text-blue-600 ring-2 ring-blue-100 border-transparent" 
          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
        }
        `}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-medium whitespace-nowrap">{formatNumber(totalComments)} <span className="hidden sm:inline">Komentar</span></span>
      </button>

      {/* Tombol Share */}
      <button
        onClick={handleShare}
        className="
        flex items-center justify-center space-x-1.5 sm:space-x-2 
        px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-gray-200 
        bg-white text-gray-600 text-xs sm:text-sm
        hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200
        "
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="font-medium">Bagikan</span>
      </button>
      </div>

      {/* Animasi smooth komentar */}
      <div
      style={{
        maxHeight: showComments ? 1000 : 0,
        opacity: showComments ? 1 : 0,
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s"
      }}
      className="overflow-hidden w-full"
      >
      {showComments && (
        <div className="w-full mt-4">
        <CommentPage 
          beritaId={beritaId} 
          onUpdateTotal={(total) => setTotalComments(total)} 
        />
        </div>
      )}
      </div>
    </div>
  );
}