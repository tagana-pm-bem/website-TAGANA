"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function EventFormModal({ isOpen, onClose, onAdd }:{ isOpen: boolean; onClose: () => void; onAdd: (payload: { title: string; date: string; time: string; category: string; description?: string }) => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("meeting");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title || !date || !time) return;
    onAdd({ title, date, time, category, description });
    setTitle(""); setDate(""); setTime(""); setCategory("meeting"); setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Event</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Event</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jam</label>
              <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={time} onChange={(e)=>setTime(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="meeting">Pertemuan</option>
              <option value="training">Pelatihan</option>
              <option value="event">Event</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="primary" size="md" onClick={handleSubmit}>Tambah</Button>
            <Button variant="secondary" size="md" onClick={onClose}>Batal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
