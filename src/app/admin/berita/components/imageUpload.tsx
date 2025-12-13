import { CloudUpload, ImagePlus } from "lucide-react";

export default function ImageUpload() {
  return (
    <div className="flex flex-col items-start gap-2">
      <label className=" font-semibold text-sm">
        Media (Gambar/Video)
      </label>

      <label
        htmlFor="banner"
        className="
           h-40 
          border-2 border-dashed w-full border-gray-300 
          rounded-xl cursor-pointer
          flex flex-col items-center justify-center
          gap-2
          hover:border-blue-400 hover:bg-blue-50/30
          transition-all
        "
      >
        <CloudUpload className="text-gray-500" size={60} />
        <p className="text-gray-500 text-sm">Klik untuk upload gambar</p>
        <p className="text-xs">Mendukung JPG, PNG, MP4 (Max 50MB)</p>
      </label>

      <input 
        id="banner"
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
