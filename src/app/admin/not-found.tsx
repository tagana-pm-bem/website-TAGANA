import React from "react";

export default function AdminNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center p-8">
				<h1 className="text-6xl font-extrabold text-red-600">404</h1>
				<p className="mt-4 text-lg text-gray-700">Halaman admin tidak ditemukan.</p>
				<p className="mt-2 text-sm text-gray-500">Kembali ke dashboard atau periksa URL.</p>
			</div>
		</div>
	);
}
