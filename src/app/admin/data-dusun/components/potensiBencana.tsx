"use client";

import { useState } from "react";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { dusunData } from "@/data/datadususn";
import { DisasterDetail } from "@/data/DataBencana";
import ModalsEdit from "./ModalsEdit";
import ModalsDelete from "./ModalsDelate";

type Risiko = "none" | "low" | "medium" | "high";

interface BencanaByDusun {
  no: number;
  dusun: string;
  disasters: DisasterDetail[];
}

export default function PotensiBencana() {
  const firstFiveDusun = dusunData.slice(0, 13);

  const [bencanaData, setBencanaData] = useState<BencanaByDusun[]>(
    firstFiveDusun.map((dusun, index) => ({
      no: index + 1,
      dusun: dusun.name,
      disasters: dusun.disasters,
    }))
  );

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    dusunIndex: number | null;
    disasterIndex: number | null;
  }>({ isOpen: false, dusunIndex: null, disasterIndex: null });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    dusunIndex: number | null;
    disasterIndex: number | null;
  }>({ isOpen: false, dusunIndex: null, disasterIndex: null });

  const [showSuccessNotif, setShowSuccessNotif] = useState(false);

  const risikoStyle = (severity: Risiko): string => {
    if (severity === "high") return "bg-red-100 text-red-600";
    if (severity === "medium") return "bg-yellow-100 text-yellow-700";
    if (severity === "low") return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  const risikoLabel = (severity: Risiko): string => {
    if (severity === "high") return "Tinggi";
    if (severity === "medium") return "Sedang";
    if (severity === "low") return "Rendah";
    return "Tidak Ada";
  };

  const handleEdit = (dusunIndex: number, disasterIndex: number) => {
    setEditModal({ isOpen: true, dusunIndex, disasterIndex });
  };

  const handleDelete = (dusunIndex: number, disasterIndex: number) => {
    setDeleteModal({ isOpen: true, dusunIndex, disasterIndex });
  };

  const handleSaveEdit = (updatedDisaster: DisasterDetail) => {
    if (editModal.dusunIndex !== null && editModal.disasterIndex !== null) {
      const newData = [...bencanaData];
      newData[editModal.dusunIndex].disasters[editModal.disasterIndex] = updatedDisaster;
      setBencanaData(newData);
      setEditModal({ isOpen: false, dusunIndex: null, disasterIndex: null });
      showSuccess();
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.dusunIndex !== null && deleteModal.disasterIndex !== null) {
      const newData = [...bencanaData];
      newData[deleteModal.dusunIndex].disasters.splice(deleteModal.disasterIndex, 1);
      setBencanaData(newData);
      setDeleteModal({ isOpen: false, dusunIndex: null, disasterIndex: null });
      showSuccess();
    }
  };

  const showSuccess = () => {
    setShowSuccessNotif(true);
    setTimeout(() => setShowSuccessNotif(false), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="font-semibold text-md">
        Riwayat & Potensi Bencana - Semua Dusun
      </h1>

      <div className="border-b border-gray-300" />

      {/* Success Notification */}
      {showSuccessNotif && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <CheckCircle size={20} />
          <span>Perubahan berhasil disimpan!</span>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Dusun", "Jenis Bencana", "Tingkat Risiko", "Keterangan", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className="bg-blue-200 shadow-sm rounded-sm px-4 py-3 text-sm font-semibold text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bencanaData.map((item, dusunIdx) =>
                item.disasters.map((disaster, disasterIdx) => (
                  <tr key={`${item.no}-${disasterIdx}`}>
                    {disasterIdx === 0 && (
                      <>
                        <td
                          rowSpan={item.disasters.length}
                          className="bg-white shadow-sm rounded-sm py-3 text-center text-sm"
                        >
                          {item.no}
                        </td>
                        <td
                          rowSpan={item.disasters.length}
                          className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium"
                        >
                          {item.dusun}
                        </td>
                      </>
                    )}

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {disaster.type}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${risikoStyle(
                          disaster.severity
                        )}`}
                      >
                        {risikoLabel(disaster.severity)}
                      </span>
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {disaster.description}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(dusunIdx, disasterIdx)}
                          className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                        >
                          <Pencil size={16} className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(dusunIdx, disasterIdx)}
                          className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Total Dusun Ditampilkan:{" "}
        <span className="font-semibold">{bencanaData.length}</span>
      </div>

      {/* Modals */}
      {editModal.isOpen && editModal.dusunIndex !== null && editModal.disasterIndex !== null && (
        <ModalsEdit
          disaster={bencanaData[editModal.dusunIndex].disasters[editModal.disasterIndex]}
          dusunName={bencanaData[editModal.dusunIndex].dusun}
          onClose={() => setEditModal({ isOpen: false, dusunIndex: null, disasterIndex: null })}
          onSave={handleSaveEdit}
        />
      )}

      {deleteModal.isOpen && (
        <ModalsDelete
          onClose={() => setDeleteModal({ isOpen: false, dusunIndex: null, disasterIndex: null })}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
