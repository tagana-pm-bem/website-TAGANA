import { useState, useMemo } from "react";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
}

export function useCalendar(initialEvents: EventItem[]) {
  const [filters, setFilters] = useState({
    location: "",
    category: "",
  });

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchLocation =
        filters.location === "" || event.location === filters.location;
      const matchCategory =
        filters.category === "" || event.category === filters.category;
      return matchLocation && matchCategory;
    });
  }, [filters, initialEvents]);

  return {
    filteredEvents,
    setFilters,
  };
}
