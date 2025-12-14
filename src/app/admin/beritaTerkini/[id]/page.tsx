import { Metadata } from "next";
import { Kategori } from "../types";
import { KATEGORI_LIST, KATEGORI_CONFIG } from "../constants";
import BeritaKategoriContent from "./components/BeritaKategoriContent";

// Generate static params for all kategori
export async function generateStaticParams() {
  return KATEGORI_LIST.map((kategori) => ({
    id: kategori,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (KATEGORI_LIST.includes(id as Kategori)) {
    const kategoriInfo = KATEGORI_CONFIG[id as Kategori];
    return {
      title: `${kategoriInfo.title} - Admin TAGANA`,
      description: `Kelola dan lihat berita kategori ${id}`,
    };
  }

  return {
    title: "Kategori Tidak Valid - Admin TAGANA",
  };
}

interface BeritaKategoriPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Validate if a string is a valid Kategori
 */
function isValidKategori(value: unknown): value is Kategori {
  return KATEGORI_LIST.includes(value as Kategori);
}

export default async function BeritaKategoriPage({
  params,
}: BeritaKategoriPageProps) {
  // Await params to access id
  const { id } = await params;

  // Validate kategori from params
  if (!isValidKategori(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-2">
            Kategori Tidak Valid
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Kategori "{id}" tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  return <BeritaKategoriContent kategori={id} />;
}
