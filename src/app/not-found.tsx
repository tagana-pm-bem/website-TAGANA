import React from "react";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="text-center p-8">
				<h1 className="text-6xl font-extrabold text-gray-800">404</h1>
				<p className="mt-4 text-xl text-gray-600">Halaman tidak ditemukan.</p>
				<p className="mt-2 text-sm text-gray-500">Periksa kembali alamat atau kembali ke halaman utama.</p>
			</div>
		</div>
	);
}
