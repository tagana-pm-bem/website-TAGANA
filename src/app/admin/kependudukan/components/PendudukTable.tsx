'use client';

import { useState, useMemo } from 'react';
import EditModal from './modals/EditModal';
import { toast } from 'sonner';
import { useDusun } from '@/hooks/useDusun.hooks';
import { Pencil, Loader2, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { uploadImageByType } from "@/services/fileService";
import { getPublicImageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/Badge";

interface DusunDB {
  id: number;
  nama: string;
  deskripsi?: string;
  gambar_url?: string; 
  jumlah_kk: number;
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  jumlah_balita: number;
  jumlah_lansia: number;
  jumlah_ibu_hamil: number;
  jumlah_disabilitas: number;
  jumlah_miskin: number;
}

export function PendudukTable() {
  const { data: pendudukData, isLoading, updateDusunStats } = useDusun();
  const [editingItem, setEditingItem] = useState<DusunDB | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedDusun, setSelectedDusun] = useState<string>("all");

  const ITEMS_PER_PAGE = 5;
  const safeData = (pendudukData as unknown as DusunDB[]) || [];
  
  // Filter data berdasarkan dusun yang dipilih
  const filteredData = useMemo(() => {
    if (selectedDusun === "all") return safeData;
    return safeData.filter(item => item.nama === selectedDusun);
  }, [safeData, selectedDusun]);

  const displayData = showAll ? filteredData : filteredData.slice(0, ITEMS_PER_PAGE);

  // Get unique dusun names for filter
  const dusunOptions = useMemo(() => {
    return safeData.map(item => item.nama);
  }, [safeData]);

  const handleEdit = (item: DusunDB) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editingItem) return;
    
    // Gunakan id toast untuk loading state jika ingin lebih advanced
    const toastId = toast.loading("Menyimpan perubahan...");

    try {
      let finalImageUrl = updatedData.gambar_url;

      if (updatedData._imageFile) {
        const filePath = await uploadImageByType(updatedData._imageFile, "dusun");
        finalImageUrl = getPublicImageUrl(filePath);
      }

      const payload = {
        deskripsi: updatedData.deskripsi,
        gambar_url: finalImageUrl,
        jumlah_kk: Number(updatedData.jumlahKK),
        jumlah_laki_laki: Number(updatedData.jumlahLakiLaki),
        jumlah_perempuan: Number(updatedData.jumlahPerempuan),
        jumlah_balita: Number(updatedData.jumlahBalita),
        jumlah_lansia: Number(updatedData.jumlahLansia),
        jumlah_ibu_hamil: Number(updatedData.jumlahIbuHamil),
        jumlah_disabilitas: Number(updatedData.jumlahPenyandangDisabilitas),
        jumlah_miskin: Number(updatedData.jumlahPendudukMiskin)
      };

      const success = await updateDusunStats(editingItem.id, payload);
      
      if (success) {
        toast.success("Berhasil!", {
          description: `Data penduduk Dusun ${editingItem.nama} telah diperbarui.`,
          id: toastId,
        });
        setEditingItem(null);
      } else {
        throw new Error("Gagal mengupdate database");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan", {
        description: "Terjadi kesalahan saat memperbarui data.",
        id: toastId,
      });
    }
  };

  const editFields = [
    { name: 'gambar_url', label: 'Foto Dusun', type: 'image' as const, required: false },
    { name: 'deskripsi', label: 'Deskripsi Dusun', type: 'textarea' as const, required: false },
    { name: 'jumlahKK', label: 'Jumlah KK', type: 'number' as const, required: true },
    { name: 'jumlahLakiLaki', label: 'Jumlah Laki-Laki', type: 'number' as const, required: true },
    { name: 'jumlahPerempuan', label: 'Jumlah Perempuan', type: 'number' as const, required: true },
    { name: 'jumlahBalita', label: 'Jumlah Balita', type: 'number' as const, required: true },
    { name: 'jumlahLansia', label: 'Jumlah Lansia', type: 'number' as const, required: true },
    { name: 'jumlahIbuHamil', label: 'Jumlah Ibu Hamil', type: 'number' as const, required: true },
    { name: 'jumlahPenyandangDisabilitas', label: 'Jumlah Penyandang Disabilitas', type: 'number' as const, required: true },
    { name: 'jumlahPendudukMiskin', label: 'Jumlah Penduduk Miskin', type: 'number' as const, required: true }
  ];

  if (isLoading) {
    return (
      <Card className="border-slate-100">
        <CardContent className="p-12 flex flex-col items-center justify-center gap-3 min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#044BB1]" />
          <span className="text-slate-500 font-medium animate-pulse">Sinkronisasi data penduduk...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl tracking-tight">Data Penduduk per Dusun</CardTitle>
            <CardDescription>Kelola data demografi dan statistik wilayah.</CardDescription>
          </div>
          
          {/* Filter Dropdown */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select value={selectedDusun} onValueChange={setSelectedDusun}>
              <SelectTrigger className="w-[200px] rounded-xl border-slate-200">
                <SelectValue placeholder="Pilih Dusun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Dusun</SelectItem>
                {dusunOptions.map((dusun) => (
                  <SelectItem key={dusun} value={dusun}>
                    {dusun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active Filter Badge */}
        {selectedDusun !== "all" && (
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-slate-500">Filter aktif:</span>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedDusun}
              <button 
                onClick={() => setSelectedDusun("all")} 
                className="ml-2 hover:text-blue-900 font-bold"
              >
                ×
              </button>
            </Badge>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 font-medium">
              Tidak ada data untuk dusun yang dipilih
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="text-center font-bold text-slate-500">No</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Dusun</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">KK</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">L</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">P</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Balita</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Lansia</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Bumil</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Disabilitas</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Miskin</TableHead>
                    <TableHead className="text-center font-bold text-slate-500">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/50">
                      <TableCell className="text-center text-sm text-slate-600">{index + 1}</TableCell>
                      <TableCell className="text-center text-sm font-bold text-slate-900 whitespace-nowrap">
                        {item.nama}
                      </TableCell>
                      <TableCell className="text-center text-sm font-medium text-slate-700">
                        {item.jumlah_kk}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_laki_laki}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_perempuan}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_balita}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_lansia}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_ibu_hamil}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_disabilitas}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {item.jumlah_miskin}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-[#044BB1]"
                        >
                          <Pencil size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredData.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center pt-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowAll(!showAll)} 
                  className="rounded-xl px-8 font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" /> 
                      Lihat Lebih Sedikit
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" /> 
                      Lihat Selengkapnya ({filteredData.length - ITEMS_PER_PAGE})
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>

      {editingItem && (
        <EditModal
          title={`Edit Data Penduduk - ${editingItem.nama}`}
          fields={editFields}
          initialData={{
            gambar_url: editingItem.gambar_url || "", 
            deskripsi: editingItem.deskripsi || "", 
            jumlahKK: editingItem.jumlah_kk,
            jumlahLakiLaki: editingItem.jumlah_laki_laki,
            jumlahPerempuan: editingItem.jumlah_perempuan,
            jumlahBalita: editingItem.jumlah_balita,
            jumlahLansia: editingItem.jumlah_lansia,
            jumlahIbuHamil: editingItem.jumlah_ibu_hamil,
            jumlahPenyandangDisabilitas: editingItem.jumlah_disabilitas,
            jumlahPendudukMiskin: editingItem.jumlah_miskin
          }}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}
    </Card>
  );
}