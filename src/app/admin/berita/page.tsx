"use client";

import { useState } from "react";
import { ChevronDown, Send, Tag, TrendingUp } from "lucide-react";
import Card from "@/components/ui/card";
import RichTextEditor from "./components/RichTextEditor";
import ImageUpload from "./components/imageUpload";
import BeritaTerkini from "./components/beritaTerkini";

export default function KelolaBeritaPage() {
  const [openKategori, setOpenKategori] = useState(false);
  const [kategori, setKategori] = useState("Pilih Kategori");

  const kategoriOptions = [
    "Bencana Alam",
    "Lingkungan",
    "Kesehatan",
    "Pendidikan",
    "Pengumuman Desa",
  ];

  return (
    <div className="flex flex-row w-full gap-6 mb-[100px]">
      <Card className="w-full flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-md font-semibold">Tulis Berita Baru</h1>
          <p className="text-sm cursor-pointer hover:underline">Simpan Draft</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className=" font-semibold text-sm">Judul Berita</label>
          <input
            placeholder="Masukan judul berita..."
            className="w-full rounded-xl shadow-sm border border-gray-300 py-2 px-3 placeholder:text-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label className=" font-semibold text-sm">Kategori</label>

          <div className="relative w-full">
            <div
              onClick={() => setOpenKategori(!openKategori)}
              className="w-full flex items-center justify-between rounded-xl shadow-sm border border-gray-300 px-3 py-2 cursor-pointer bg-white"
            >
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={
                    kategori === "Pilih Kategori"
                      ? "text-gray-400"
                      : "text-black"
                  }
                >
                  {kategori}
                </span>
              </div>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  openKategori ? "rotate-180" : ""
                }`}
              />
            </div>

            {openKategori && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl p-2 z-20">
                {kategoriOptions.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setKategori(item);
                      setOpenKategori(false);
                    }}
                    className="px-4 py-3 rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm">Isi Berita</h1>
        </div>
        <RichTextEditor />

        <ImageUpload />

        <div className="flex flex-row gap-3 items-center justify-end w-full">
          <button className="min-w-20 bg-gray-300 shadow-sm hover:bg-gray-400 cursor-pointer duration-300 rounded-xl py-2 px-4">
            Batal
          </button>
          <button className="flex flex-row items-center gap-3 min-w-20 bg-blue-400 shadow-sm hover:bg-blue-500 cursor-pointer duration-300 rounded-xl py-2 px-4">
            <Send size={18} color="white" />
            <span className="text-white font-semibold">
              Publikasikan Berita
            </span>
          </button>
        </div>
      </Card>

      <div className="flex flex-col gap-6 w-1/2 h-full">
        <div className="w-full rounded-xl flex p-4 justify-between items-center bg-gradient-to-r from-blue-500 via-blue-600 to-black h-full">
          <div className="flex flex-col gap-2 items-start">
            <h1 className="font-bold text-5xl text-white">24</h1>
            <p className="text-md text-white">Berita diterbitkan bulan ini</p>
          </div>

          <div className="w-13 h-13 rounded-lg flex items-center justify-center bg-white/30">
            <TrendingUp size={30} color="white" />
          </div>
        </div>

        <Card>
          <BeritaTerkini />
        </Card>
      </div>
    </div>
  );
}
