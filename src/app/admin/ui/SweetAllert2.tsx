// "use client";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// // --- Fungsi 1: Konfirmasi Delete (Reusable) ---
// export const confirmDelete = async (
//   title = "Yakin ingin menghapus?", 
//   text = "Data yang dihapus tidak dapat dikembalikan!"
// ) => {
//   return MySwal.fire({
//     title: title,
//     text: text,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33", // Merah
//     cancelButtonColor: "#3085d6", // Biru
//     confirmButtonText: "Ya, Hapus!",
//     cancelButtonText: "Batal",
//     reverseButtons: true, // Opsional: Tombol hapus di kanan/kiri
//   });
// };

// //Loading (Saat proses API berjalan) ---
// export const showLoading = (title = "Memproses...", text = "Mohon tunggu sebentar") => {
//   MySwal.fire({
//     title: title,
//     html: text,
//     allowOutsideClick: false,
//     showConfirmButton: false,
//     didOpen: () => {
//       Swal.showLoading();
//     },
//   });
// };

// //Sukses (Saat berhasil) ---
// export const showSuccess = (title = "Berhasil!", text = "Aksi telah selesai.") => {
//   return MySwal.fire({
//     icon: "success",
//     title: title,
//     text: text,
//     timer: 1500,
//     showConfirmButton: false,
//   });
// };

// //Error (Saat gagal) ---
// export const showError = (title = "Gagal!", text = "Terjadi kesalahan.") => {
//   return MySwal.fire({
//     icon: "error",
//     title: title,
//     text: text,
//   });
// };

// // Default export jika masih dibutuhkan sebagai komponen (opsional, bisa dikosongkan)
// const SweetAllert2 = () => {
//   return null; 
// };
// export default SweetAllert2;



"use client";

import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ==========================================
// 1. FITUR BARU: SAVE CHANGES (3 Tombol)
// ==========================================
export const confirmSaveChanges = (
    title = "menyimpan perubahan?",
    confirmText = "Simpan",
    denyText = "Jangan simpan"
): Promise<SweetAlertResult> => {
    return MySwal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: confirmText,
        denyButtonText: denyText,
        icon: "question", // Opsional: icon tanya
        iconColor: "#3085d6",
        confirmButtonColor: "#28a745", // Ubah warna tombol confirm (hijau)
        denyButtonColor: "#d33" // Opsional: warna tombol deny (merah)
    });
};

// ==========================================
// 2. FITUR BARU: DRAGGABLE ALERTS
// ==========================================

// a. Draggable Sukses
export const showDraggableSuccess = (title = "Berhasil menambahkan") => {
  return MySwal.fire({
    title: title,
    icon: "success",
    draggable: true // Fitur draggable aktif
  });
};

// b. Draggable Error (Permintaan Anda)
export const showDraggableError = (title = "Gagal menambahkan", text = "Terjadi kesalahan") => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "error",
    draggable: true // Fitur draggable aktif
  });
};

// ==========================================
// FITUR LAMA (Delete & Loading)
// ==========================================

export const confirmDelete = (
  title = "Yakin ingin menghapus?", 
  text = "Data yang dihapus tidak dapat dikembalikan!"
): Promise<SweetAlertResult> => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33", 
    cancelButtonColor: "#3085d6", 
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
  });
};

export const showLoading = (title = "Memproses...", text = "Mohon tunggu sebentar") => {
  return MySwal.fire({
    title: title,
    html: text,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const showSuccess = (title = "Berhasil!", text = "Aksi telah selesai.") => {
  return MySwal.fire({
    icon: "success",
    title: title,
    text: text,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const showError = (title = "Gagal!", text = "Terjadi kesalahan.") => {
  return MySwal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};

const SweetAllert2 = () => null;
export default SweetAllert2;