"use client";

import { useRouter } from "next/navigation";

export default function BeritaDetailClient({ berita }: { berita: any }) {
  const router = useRouter();

  const getCategoryColor = (category: string) => {
    const colors = {
      Banjir: "bg-blue-100 text-blue-700 border-blue-300",
      Longsor: "bg-amber-100 text-amber-700 border-amber-300",
      Gempa: "bg-red-100 text-red-700 border-red-300",
      "Angin Puting Beliung": "bg-purple-100 text-purple-700 border-purple-300",
      Kebakaran: "bg-orange-100 text-orange-700 border-orange-300",
      Lainnya: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-300"
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push("/BeritaBencana")}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 mb-4"
          >
            Kembali
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="relative h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">[Placeholder Image]</span>
          </div>

          <div className="p-8">
            {/* Category & Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(
                  berita.category
                )}`}
              >
                {berita.category}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                  berita.status === "Terjadi"
                    ? "bg-red-500"
                    : berita.status === "Ditangani"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {berita.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {berita.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200 text-gray-600">
              <span>{formatDate(berita.date)}</span>
              <span>{berita.time} WIB</span>
              <span>{berita.location}</span>
            </div>

            {/* Casualties & Damage */}
            {(berita.casualties || berita.damage) && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {berita.casualties &&
                  Object.keys(berita.casualties).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-bold text-red-800 mb-3">
                        Korban Jiwa
                      </h3>
                      {Object.entries(berita.casualties).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between text-red-900"
                        >
                          <span>{key}</span>
                          <span className="font-bold">
                            {value ? `${value} orang` : "0 orang"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                {berita.damage && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-bold text-orange-800 mb-3">
                      Kerusakan
                    </h3>
                    {berita.damage.rumah && (
                      <div className="flex justify-between">
                        <span>Rumah Rusak:</span>
                        <span className="font-bold">
                          {berita.damage.rumah} unit
                        </span>
                      </div>
                    )}
                    {berita.damage.fasilitas?.length ? (
                      <ul className="list-disc list-inside text-sm mt-2">
                        {berita.damage.fasilitas.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {berita.content}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-gray-600">
              <span>
                Oleh: <strong>{berita.author}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
