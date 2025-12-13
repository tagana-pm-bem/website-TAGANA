import AddEvent from "./components/addEvent";
import Agenda from "./components/agenda";

export default function KalenderPage() {
  return (
    <div className="flex flex-row gap-8 w-full">
      <div className="h-full w-full">
        <AddEvent />
      </div>

      <div className="h-full w-full">
        <Agenda />
      </div>
    </div>
  );
}
