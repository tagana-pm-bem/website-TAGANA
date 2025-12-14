"use client";

import { useSearchParams } from "next/navigation";
import BeritaKategoriContent from "./components/BeritaKategoriContent";

export default function BeritaKategoriPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <div>ID tidak ditemukan</div>;
  }

  return <BeritaKategoriContent id={id} />;
}
