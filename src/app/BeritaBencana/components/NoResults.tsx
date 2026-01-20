"use client";

import { useRouter } from "next/navigation";
import { SearchX, Home, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

export function NoResults({ message = "Tidak Ada Berita Ditemukan. Coba ubah filter atau kata kunci pencarian Anda." }: { message?: string }) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/BeritaBencana");
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-lg w-full text-center shadow-xl">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gray-100 p-6">
              <SearchX className="w-16 h-16 text-gray-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Tidak Ada Berita Ditemukan
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium">
              💡 Saran: Coba kata kunci yang lebih umum atau hapus beberapa filter untuk hasil yang lebih luas.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={handleBackToHome}
            variant="default"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Beranda Berita
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
