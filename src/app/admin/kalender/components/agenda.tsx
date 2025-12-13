import Card from "@/components/ui/card";
import MobileCalendar from "./calendar";
import EventList from "./EventList";

export default function Agenda() {
  return (
    <Card className="w-full flex-col gap-8 flex">
      <h1 className="text-md font-bold">Agenda</h1>
      <MobileCalendar />
      <h1 className="text-md font-bold">Acara Terjadwal Bulan Ini</h1>
      <EventList />
    </Card>
  );
}
