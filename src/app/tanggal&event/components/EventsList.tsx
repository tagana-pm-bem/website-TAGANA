import { Card, CardContent } from "@/components/ui/event/card";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
}

interface EventsListProps {
  events: EventItem[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid gap-4 mt-4">
      {events.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          Tidak ada event yang cocok dengan filter.
        </p>
      )}

      {events.map((event) => (
        <Card key={event.id} className="shadow-sm">
          <CardContent className="p-4 flex flex-col gap-1">
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.date}</p>
            <p className="text-sm">{event.location}</p>
            <p className="text-xs text-primary mt-1">{event.category}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
