"use client";

import React, { useState, useEffect } from "react";
import { interactionService } from "@/services/interactionService";
import { Loader2 } from "lucide-react";

interface Comment {
  id: string;
  nama_pengguna: string;
  isi_komentar: string;
  created_at: string;
}

interface CommentPageProps {
  beritaId: string;
  onUpdateTotal?: (num: number) => void;
}

export function CommentPage({ beritaId, onUpdateTotal }: CommentPageProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [nama, setNama] = useState(""); // Input nama
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await interactionService.getComments(beritaId);
        setComments(data as unknown as Comment[]);
        if (onUpdateTotal) onUpdateTotal(data.length);
      } catch (error) {
        console.error("Gagal ambil komentar", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (beritaId) fetchComments();
  }, [beritaId]);

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    const finalName = nama.trim() || "Pengunjung";
    setIsPosting(true);

    try {
      const newComment = await interactionService.postComment(beritaId, finalName, commentText);
      
      const updatedList = [newComment, ...comments];
      setComments(updatedList as unknown as Comment[]);
      if (onUpdateTotal) onUpdateTotal(updatedList.length);

      setCommentText("");
    } catch (error) {
      alert("Gagal mengirim komentar.");
    } finally {
      setIsPosting(false);
    }
  };

  const timeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return "Baru saja";
  };

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mt-4 shadow-inner">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Komentar</h3>

      <div className="flex flex-col gap-3 mb-8">
        <input 
           type="text"
           value={nama}
           onChange={(e) => setNama(e.target.value)}
           placeholder="Nama Anda (Opsional)"
           className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[50px] resize-none"
            />
            <button
                onClick={handleSubmitComment}
                disabled={isPosting || !commentText.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors h-fit self-end flex items-center gap-2"
            >
                {isPosting && <Loader2 className="animate-spin" size={16} />}
                Kirim
            </button>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
             <div className="text-center py-4"><Loader2 className="animate-spin mx-auto text-gray-400" /></div>
        ) : comments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center italic">Belum ada komentar.</p>
        ) : (
            comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm uppercase">
                    {comment.nama_pengguna.charAt(0)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{comment.nama_pengguna}</h4>
                        <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {comment.isi_komentar}
                    </p>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}