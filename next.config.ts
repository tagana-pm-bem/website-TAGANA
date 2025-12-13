/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pastikan TIDAK ADA baris "output: 'export'" di sini
  
  images: {
    // Supaya gambar dari Supabase/Unsplash bisa muncul
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Ini mengizinkan gambar dari semua domain (termasuk Supabase)
      },
    ],
  },
};

export default nextConfig;