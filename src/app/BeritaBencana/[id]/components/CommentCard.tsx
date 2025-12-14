"use client";

import React, { useState } from "react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  text: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

interface CommentCardProps {
  comments?: Comment[];
  totalComments?: number;
  onAddComment?: (text: string) => void;
  onLikeComment?: (commentId: string) => void;
  onReplyComment?: (commentId: string, text: string) => void;
}

export function CommentPage({
  comments = [],
  totalComments = 24,
  onAddComment,
  onLikeComment,
  onReplyComment,
}: CommentCardProps) {
  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleSubmitComment = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
    if (onLikeComment) onLikeComment(commentId);
  };

  const defaultComments: Comment[] = [
    {
      id: "1",
      author: { name: "Andi Pratama" },
      text: "Wah, jadi pengen liburan ke sana lagi. Terakhir ke sana tahun 2019 rasain belum sebagus ini fasilitasnya.",
      time: "2 jam yang lalu",
      likes: 0,
    },
    {
      id: "2",
      author: { name: "Siti Nurhaliza" },
      text: "Senoga keberhasilannya tetap terjaga ya, jangan cuma bagus di awal saja. Perlu dukuran dari pengunjung juga.",
      time: "5 jam yang lalu",
      likes: 12,
    },
    {
      id: "3",
      author: { name: "Rudi Hartono" },
      text: "Selalu bangga! Danau Toba itu aset bangga yang luar biasa.",
      time: "1 hari yang lalu",
      likes: 5,
    },
  ];

  const displayComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8 shadow-2xl">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Komentar ({totalComments})
      </h3>

      {/* Comment Input */}
      <div className="flex items-start space-x-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-semibold">
            A
          </div>
        </div>
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Tulis komentar Anda..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitComment();
              }
            }}
          />
          <button
            onClick={handleSubmitComment}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Kirim
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {displayComments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-semibold text-sm">
                  {comment.author.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900 text-sm">{comment.author.name}</h4>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {comment.text}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`text-sm font-medium transition-colors ${
                    likedComments.has(comment.id)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Suka {comment.likes > 0 && `(${comment.likes})`}
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Balas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
