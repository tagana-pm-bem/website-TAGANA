import { beritaBencanaData } from "@/data/beritaBencana";
import BeritaDetailClient from "./components/beritaDetailClient";

export function generateStaticParams() {
  return beritaBencanaData.map((berita) => ({
    id: berita.id.toString(),
  }));
}

export default function DetailBeritaPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const berita = beritaBencanaData.find((b) => b.id === id);

  if (!berita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600">ID berita yang kamu cari tidak ada.</p>
        </div>
      </div>
    );
  }

  return <BeritaDetailClient berita={berita} />;
}
