import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { eventDummy } from "../dummydata";
import { BackButton } from "@/components/ui/back-button";

export function generateStaticParams() {
  return eventDummy.map((event) => ({
    id: event.id.toString(),
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;

  // Find the event from eventDummy
  const event = eventDummy.find((e) => e.id.toString() === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Tidak Ditemukan</h1>
          <Link
            href="/admin/KalenderEventlist"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className=" px-4 py-8 max-w-7xl mx-auto">
       <BackButton href="./KalenderEventlist" label="Kembali ke kalenderlist" />

      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Image & Title */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-96 w-full">
            <Image
              src={event.image}
              alt={event.judul}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {event.judul}
            </h1>
            
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Tanggal</p>
                  <p className="text-lg font-bold text-gray-900">
                    {event.tanggal} {event.bulan}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Waktu</p>
                  <p className="text-lg font-bold text-gray-900">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <div className="p-3 bg-green-500 rounded-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Lokasi</p>
                  <p className="text-lg font-bold text-gray-900">
                    {event.lokasi}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Deskripsi Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.deskripsi}
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Daftar Event
              </button>
              <button className="px-8 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200">
                Bagikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
