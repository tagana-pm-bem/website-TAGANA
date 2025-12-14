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
    <>
      <div className="flex items-center space-x-4 py-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
            isLiked
              ? "bg-red-50 border-red-200 text-red-600"
              : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50"
          }`}
        >
          <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm font-medium">{formatNumber(likes)} Suka</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 transition-all ${showComments ? "bg-gray-100 ring-2 ring-gray-200" : "bg-white hover:bg-gray-50"}`}
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">{formatNumber(totalComments)} Komentar</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-sm font-medium">Bagikan</span>
        </button>
      </div>

      {showComments && (
        <CommentPage 
          beritaId={beritaId} 
          onUpdateTotal={(total) => setTotalComments(total)} 
        />
      )}
    </>
  );
}