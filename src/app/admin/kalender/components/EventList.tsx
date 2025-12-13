import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function EventList() {
  const eventDummy = [
    {
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
    {
      bulan: "Okt",
      tanggal: 15,
      judul: "Posyandu Balita & Lansia",
      deskripsi:
        "Pemeriksaan kesehatan rutin bulanan untuk balita dan lansia di Balai Desa",
      startTime: "18:00",
      endTime: "12:00",
      lokasi: "Balai Desa",
      image: "/ketos.png",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {eventDummy.map((event, index) => (
        <div
          key={index}
          className="shadow-md rounded-xl h-full p-3 flex flex-row gap-3 items-center"
        >
          <div className="flex flex-col items-center justify-center min-w-15 min-h-15 bg-blue-200 rounded-xl">
            <h1 className="text-md font-bold text-blue-500">{event.bulan}</h1>
            <h1 className="font-semibold text-xl">{event.tanggal}</h1>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-lg">{event.judul}</h1>
            <p className="text-sm font-md text-gray-400">{event.deskripsi}</p>
            <div className="flex flex-row gap-3 items-center w-full">
              <div className="flex flex-row gap-2 items-center">
                <Clock size={15} color="skyBlue" />
                <p className="text-sm text-blue-400">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MapPin size={15} color="skyBlue" />
                <p className="text-sm text-blue-400">{event.lokasi}</p>
              </div>
            </div>
          </div>

          <Image
            src={event.image || "/default.jpg"}
            alt="Event Image"
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        </div>
      ))}
    </div>
  );
}
