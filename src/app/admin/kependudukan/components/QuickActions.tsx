"use client";

import React, { useState } from "react";
import AddAction from "./ActionButton/Addaction";

export function QuickActions({ onAdd }: { onAdd?: () => void }) {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setShowModal(true);
    onAdd?.();
  };

  return (
    <>
      <div className="space-y-3">
        <button
          onClick={handleAdd}
          className="cursor-pointer w-full md:w-auto flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
        >
          <div className="bg-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Tambah Penduduk</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm flex items-center justify-center z-50 p-4 shadow-2xl">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="cursor-pointer absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AddAction />
          </div>
        </div>
      )}
    </>
  );
}
