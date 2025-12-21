'use client';

import React, { useState, useEffect } from 'react';
import { useSweetAlert } from "@/components/ui/SweetAlertProvider";
import { X } from 'lucide-react'; 

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'image';
  required?: boolean;
  options?: { value: string | number; label: string }[];
}

interface EditModalProps {
  title: string;
  fields: Field[];
  initialData: any;
  onSave: (data: any) => Promise<void> | void;
  onClose: () => void;
}

export default function EditModal({ title, fields, initialData, onSave, onClose }: EditModalProps) {
  const { showCenterSuccess, showCenterFailed, showLoading } = useSweetAlert();
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showLoading("Menyimpan Perubahan...");
      await onSave(formData);
      await showCenterSuccess("Berhasil Disimpan");
      onClose();
    } catch (error) {
      console.error(error);
      showCenterFailed("Gagal Menyimpan Data");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
              if (field.type === 'image') return null;

              return (
                <div key={field.name}>
                  {field.type === 'textarea' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        required={field.required}
                        placeholder={`Masukkan ${field.label}...`}
                      />
                    </div>
                  ) : field.type === 'select' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={field.required}
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={field.required}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}