import { Metadata } from "next";
import BeritaList from "./components/beritaList";
import {Card} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Berita Terkini - Admin TAGANA",
  description:
    "Kelola dan lihat semua berita terkini seputar bencana dan kegiatan TAGANA",
  keywords: ["berita", "bencana", "TAGANA", "admin", "manajemen berita"],
};

export default function BeritaTerkini() {
  return (
    <div className="w-full h-full">
      <Card className="w-full h-full">
        <BeritaList />
      </Card>
    </div>
  );
}
