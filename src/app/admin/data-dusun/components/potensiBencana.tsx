"use client";

import { useState } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type Risiko = "Tinggi" | "Sedang" | "Rendah";
type Status = "Paling Tinggi" | "Biasa";

interface BencanaItem {
  no: number;
  jenis: string;
  frekuensi: "Tinggi" | "Sedang" | "Rendah";
  risiko: Risiko;
  status: Status;
}

export default function PotensiBencana() {
  const bencana: BencanaItem[] = [
    { no: 1, jenis: "Tanah Longsor", frekuensi: "Tinggi", risiko: "Tinggi", status: "Paling Tinggi" },
    { no: 2, jenis: "Banjir", frekuensi: "Sedang", risiko: "Sedang", status: "Biasa" },
    { no: 3, jenis: "Kebakaran", frekuensi: "Sedang", risiko: "Sedang", status: "Biasa" },
    { no: 4, jenis: "Gempa", frekuensi: "Rendah", risiko: "Sedang", status: "Biasa" },
    { no: 5, jenis: "Angin Puting Beliung", frekuensi: "Rendah", risiko: "Rendah", status: "Biasa" },
  ];

  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(bencana.length / ITEMS_PER_PAGE);

  const paginatedData = bencana.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const risikoStyle = (v: Risiko): string => {
    if (v === "Tinggi") return "bg-red-100 text-red-600";
    if (v === "Sedang") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  const statusStyle = (v: Status): string =>
    v === "Paling Tinggi"
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="font-semibold text-md">
        Riwayat & Potensi Bencana Terdaftar
      </h1>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Jenis Bencana", "Frekuensi", "Tingkat Risiko", "Status", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className="bg-blue-200 shadow-sm rounded-sm px-4 py-3 text-sm font-semibold text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.no}>
                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.no}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium">
                    {item.jenis}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                    {item.frekuensi}
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${risikoStyle(item.risiko)}`}>
                      {item.risiko}
                    </span>
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="bg-white shadow-sm rounded-sm py-3">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 rounded-lg shadow-sm hover:bg-blue-100 transition">
                        <Pencil size={16} className="text-blue-500" />
                      </button>
                      <button className="p-2 rounded-lg shadow-sm hover:bg-red-100 transition">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-white disabled:opacity-40 hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <span className="text-sm font-medium">
          Halaman {page} dari {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-white disabled:opacity-40 hover:bg-gray-100"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
