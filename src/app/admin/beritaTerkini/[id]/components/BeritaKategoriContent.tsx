"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import type { Kategori } from "../../types";
import { KATEGORI_CONFIG } from "../../constants";
import {
  getStatusBadge,
  getKategoriBadge,
  getKategoriTitle,
} from "../../utils/helpers";
import { BERITA_DUMMY } from "../../data/dummy";

interface BeritaKategoriContentProps {
  kategori: Kategori;
}

export default function BeritaKategoriContent({
  kategori,
}: BeritaKategoriContentProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [likes, setLikes] = useState(145);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Budi Santoso",
      date: "15 Januari 2025",
      text: "Semoga segera normal kembali untuk warga yang terdampak.",
      avatar: "B",
    },
    {
      id: 2,
      author: "Siti Nurhaliza",
      date: "14 Januari 2025",
      text: "Terima kasih Tim TAGANA atas respons cepat dalam menangani bencana ini.",
      avatar: "S",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Get first berita dari kategori yang sesuai
  const berita = BERITA_DUMMY.find((b) => b.kategori === kategori);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      // Simulate submit delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newCommentObj = {
        id: comments.length + 1,
        author: "Admin TAGANA",
        date: new Date().toLocaleDateString("id-ID"),
        text: newComment,
        avatar: "A",
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // TODO: Implement delete logic here
      console.log("Berita dihapus:", berita?.id);
      // Simulate delete delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowDeleteModal(false);
      // router.back();
    } catch (error) {
      console.error("Error deleting berita:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  if (!berita) {
    return (
      <main className="w-full min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg text-gray-600 mb-6">
              Artikel tidak ditemukan
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="pt-4 sm:pt-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Kembali</span>
          </button>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 sm:py-6 text-xs sm:text-sm text-gray-600">
          <button
            onClick={() => router.push("/")}
            className="hover:text-blue-600 transition-colors"
          >
            Beranda
          </button>
          <span>›</span>
          <button
            onClick={() => router.back()}
            className="hover:text-blue-600 transition-colors"
          >
            Kategori
          </button>
          <span>›</span>
          <span className="text-blue-600 font-medium">{berita.kategori}</span>
        </nav>

        {/* Article Header */}
        <header className="py-6 sm:py-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize border ${getKategoriBadge(
                berita.kategori
              )}`}
            >
              {berita.kategori}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            {berita.judul}
          </h1>

          {/* Author Info & Date */}
          <div className="flex items-center gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-gray-200">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">
                T
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Tim TAGANA Sriharjo
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                <time dateTime={berita.tanggal} className="font-medium">
                  {berita.tanggal}
                </time>
                <span>•</span>
                <span>4 menit baca</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Hapus artikel"
                title="Hapus"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Kembali ke halaman sebelumnya"
                title="Kembali"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <section className="py-8 sm:py-12">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={berita.image}
              alt={berita.judul}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Article Content */}
        <article className="prose prose-sm sm:prose md:prose-lg max-w-none py-8 sm:py-12 space-y-6">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {berita.ringkasan}
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Tim TAGANA Sriharjo langsung turun ke lokasi untuk melakukan
            evakuasi warga yang terdampak. Sebanyak 120 jiwa telah dievakuasi ke
            posko pengungsian di Balai Desa Sriharjo.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Kepada Desa Sriharjo, Bapak Suryanto menyatakan bahwa bantuan
            logistik berupa makanan siap saji, air bersih, dan selimut telah
            disosialisasikan kepada para pengungsi. Tim medis juga standby untuk
            memberikan pelayanan kesehatan.
          </p>
        </article>

        {/* Footer Spacing */}
        <div className="py-12 sm:py-16" />

        {/* Like & Comment Section */}
        <section className="py-8 sm:py-12 border-t border-gray-200">
          {/* Like Button */}
          <div className="mb-8">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isLiked
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                  isLiked ? "fill-current scale-110" : ""
                }`}
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes} Suka</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Komentar ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar Anda..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isSubmittingComment}
              />
              <button
                type="submit"
                disabled={isSubmittingComment || !newComment.trim()}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmittingComment ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Kirim Komentar</span>
                  </>
                )}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Belum ada komentar. Jadilah yang pertama berkomentar!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {comment.avatar}
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {comment.author}
                        </h4>
                        <time className="text-xs sm:text-sm text-gray-500">
                          {comment.date}
                        </time>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mt-2 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Footer Spacing */}
        <div className="py-12 sm:py-16" />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300 border border-white/20">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 4v2M7 7h10M5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Hapus Berita
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Apakah Anda yakin ingin menghapus berita ini?
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">
                  "{berita?.judul}"
                </span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara
                permanen.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 sm:py-5 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end rounded-b-lg sm:rounded-b-xl">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Hapus</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
