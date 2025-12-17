"use client";

import React, { createContext, useContext } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Inisialisasi MySwal
const MySwal = withReactContent(Swal);

// 1. Definisikan Tipe Data (Interface)
interface SweetAlertContextType {
  confirmDelete: (title?: string, text?: string) => Promise<SweetAlertResult>;
  confirmSaveChanges: (title?: string,confirmText?: string,denyText?: string) => Promise<SweetAlertResult>;
  showLoading: (title?: string, text?: string) => void;
  showSuccess: (title?: string, text?: string) => Promise<SweetAlertResult>;
  showError: (title?: string, text?: string) => Promise<SweetAlertResult>;
  showDraggableSuccess: (title?: string) => Promise<SweetAlertResult>;
  showDraggableError: (title?: string,text?: string) => Promise<SweetAlertResult>;
  showCenterSuccess: (title?: string) => Promise<SweetAlertResult>;
  showCenterFailed: (title?: string) => Promise<SweetAlertResult>;
  confirmLogout: () => Promise<SweetAlertResult>;
}

// 2. Buat Context
const SweetAlertContext = createContext<SweetAlertContextType | undefined>(
  undefined
);


// 1. Tambahkan Logic Function confirmLogout
  const confirmLogout = () => {
    return MySwal.fire({
      title: "Keluar halaman admin?",
      text: "Anda harus login kembali untuk mengakses halaman ini.",
      icon: "warning",
      iconColor: "#f39c12",
      showCancelButton: true,
      confirmButtonColor: "#d33", 
      cancelButtonColor: "#3085d6", 
      confirmButtonText: "Keluar!",
      cancelButtonText: "Batal",
    });
  };

// 2. TAMBAHKAN DI SINI (LOGIC FUNCTION)
  // ----------------------------------------------------
  const showCenterSuccess = (title = "Your work has been saved") => {
    return MySwal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const showCenterFailed = (title = "Your work has been saved") => {
    return MySwal.fire({
      position: "center",
      icon: "error",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  };

// 3. Buat Provider Component
export const SweetAlertProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


// --- LOGIKA FUNGSI (Sama seperti file helper sebelumnya) ---

  const confirmDelete = (
    title = "Yakin ingin menghapus?",
    text = "Data yang dihapus tidak dapat dikembalikan!"
  ) => {
    return MySwal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
  };

  const confirmSaveChanges = (
    title = "Simpan perubahan?",
    confirmText = "Simpan",
    denyText = "Jangan Simpan"
  ) => {
    return MySwal.fire({
      title,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: confirmText,
      confirmButtonColor: "#1581BF",
      denyButtonText: denyText,
      icon: "question",
      iconColor: "#3085d6",
    });
  };

  const showLoading = (
    title = "Memproses...",
    text = "Mohon tunggu sebentar"
  ) => {
    MySwal.fire({
      title,
      html: text,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });
  };

  const showSuccess = (title = "Berhasil!", text = "Aksi telah selesai.") => {
    return MySwal.fire({
      icon: "success",
      title,
      text,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const showError = (title = "Gagal!", text = "Terjadi kesalahan.") => {
    return MySwal.fire({ icon: "error", title, text });
  };

  const showDraggableSuccess = (title = "Berhasil menambahkan") => {
    return MySwal.fire({ title, icon: "success" });
  };

  const showDraggableError = (
    title = "Gagal menambahkan",
    text = "Terjadi kesalahan"
  ) => {
    return MySwal.fire({ title, text, icon: "error"  });
  };

  // Bungkus semua fungsi ke dalam object value
  const value = {
    confirmDelete,
    confirmSaveChanges,
    showLoading,
    showSuccess,
    showError,
    showDraggableSuccess,
    showDraggableError,
    showCenterSuccess,
    showCenterFailed,
    confirmLogout,
  };

  return (
    <SweetAlertContext.Provider value={value}>
      {children}
    </SweetAlertContext.Provider>
  );
};

// 4. Custom Hook untuk mempermudah pemanggilan
export const useSweetAlert = () => {
  const context = useContext(SweetAlertContext);
  if (context === undefined) {
    throw new Error("useSweetAlert must be used within a SweetAlertProvider");
  }
  return context;
};
