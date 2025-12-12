import { ImagePlus } from "lucide-react";

export default function ImageUpload() {
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-blue-400 font-semibold text-md">
        Gambar Banner (optional)
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
        <ImagePlus className="text-gray-500" size={32} />
        <p className="text-gray-500 text-sm">Klik untuk upload gambar</p>
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
