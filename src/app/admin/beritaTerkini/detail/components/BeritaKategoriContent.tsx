"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { beritaService } from "@/services/beritaService";
import { interactionService } from "@/services/interactionService";
// 1. Import helper style
import { getKategoriStyle } from "@/app/admin/beritaTerkini/constants";

import { confirmDelete, showLoading, showSuccess, showError } from "@/app/admin/ui/SweetAllert2";

interface BeritaKategoriContentProps {
  id: string;
}

export default function BeritaKategoriContent({
  id,
}: BeritaKategoriContentProps) {
  const router = useRouter();

  const [berita, setBerita] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const dataBerita = await beritaService.getById(id);
        setBerita(dataBerita);

        const countLikes = await interactionService.getLikeCount(id);
        setLikes(countLikes);
        const likedStatus = await interactionService.checkIsLiked(id);
        setIsLiked(likedStatus);

        const dataComments = await interactionService.getComments(id);
        setComments(dataComments || []);

      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAllData();
  }, [id]);

  const handleLike = async () => {
    try {
      const prevLiked = isLiked;
      setIsLiked(!prevLiked);
      setLikes(prevLiked ? likes - 1 : likes + 1);
      await interactionService.toggleLike(id);
    } catch (error: any) {
      alert(error.message || "Gagal menyukai berita (Login diperlukan)");
      setIsLiked(isLiked); 
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const newCommentObj = await interactionService.postComment(id, "Admin", newComment);
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      showError("Gagal", "Tidak dapat mengirim komentar");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await confirmDelete("Hapus komentar?", "Komentar akan hilang permanen.");
    
    if (result.isConfirmed) {
      try {
        await interactionService.deleteComment(commentId);
        setComments(comments.filter(c => c.id !== commentId));
        showSuccess("Terhapus!", "Komentar berhasil dihapus.");
      } catch (error) {
        console.error("Gagal hapus komentar:", error);
        showError("Gagal", "Tidak dapat menghapus komentar.");
      }
    }
  };

  const handleDeleteBerita = async () => {
    const result = await confirmDelete(
      "Hapus Berita?", 
      `Berita "${berita.judul}" akan dihapus permanen.`
    );

    if (result.isConfirmed) {
      try {
        showLoading("Menghapus...", "Sedang menghapus data dari server");
        await beritaService.delete(id);
        await showSuccess("Terhapus!", "Berita berhasil dihapus.");
        router.push("/admin/beritaTerkini"); 
      } catch (error) {
        console.error("Error deleting berita:", error);
        showError("Gagal", "Terjadi kesalahan saat menghapus berita.");
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!berita) {
    return (
      <main className="w-full min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-lg text-gray-600 mb-6">Artikel tidak ditemukan</p>
          <button onClick={() => router.back()} className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg">Kembali</button>
        </div>
      </main>
    );
  }

  // 2. Ambil style kategori (setelah data berita tersedia)
  const kategoriName = berita.kategori_berita?.nama || "Umum";
  const style = getKategoriStyle(kategoriName);

  return (
    <main className="w-full min-h-screen bg-white mb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="pt-4 sm:pt-6">
          <button onClick={() => router.back()} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <span>← Kembali</span>
          </button>
        </div>

        {/* Header */}
        <header className="py-6 sm:py-8">
          <div className="mb-4">
            {/* 3. Gunakan style dinamis pada badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border shadow-sm ${style.badge}`}>
              {kategoriName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {berita.judul}
          </h1>

          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {berita.penulis?.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{berita.penulis || "Admin"}</p>
                <time className="text-sm text-gray-600">{formatDate(berita.created_at || berita.tanggal)}</time>
              </div>
            </div>
            
            <button 
              onClick={handleDeleteBerita} 
              className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg" 
              title="Hapus Berita"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </header>

        <section className="py-4">
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden bg-gray-100 shadow-md">
            <Image
              src={berita.file_url || "https://picsum.photos/600/400"}
              alt={berita.judul}
              fill
              className="object-cover"
              priority
              unoptimized={berita.file_url?.startsWith('http') ? false : true}
            />
          </div>
        </section>

        <article className="
          py-8 text-gray-800 leading-relaxed
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
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
           <div dangerouslySetInnerHTML={{ __html: berita.isi_berita }} />
        </article>

        {/* ... (Sisa kode komentar sama seperti sebelumnya) ... */}
        <section className="py-8 border-t border-gray-200 mt-8">
          <div className="mb-8">
            <button
              onClick={handleLike}
              className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span>{likes} Suka</span>
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Komentar ({comments.length})</h3>

            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                disabled={isSubmittingComment}
              />
              <button
                type="submit"
                disabled={isSubmittingComment || !newComment.trim()}
                className="cursor-pointer px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {isSubmittingComment ? "Mengirim..." : "Kirim Komentar"}
              </button>
            </form>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Belum ada komentar.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase">
                      {comment.nama_pengguna.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{comment.nama_pengguna}</h4>
                            <time className="text-xs text-gray-500">{formatDate(comment.created_at)}</time>
                          </div>
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="cursor-pointer text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            title="Hapus Komentar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                      </div>
                      <p className="text-gray-700 mt-2 whitespace-pre-wrap">{comment.isi_komentar}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}