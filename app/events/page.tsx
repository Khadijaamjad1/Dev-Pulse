"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/lib/supabase";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
  .from("events")
  .select("*")
  .eq("status", "approved")
  .order("created_at", { ascending: false });

      
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setEvents(data || []);
      setLoading(false);
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();

    return (
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 p-8">
      <h1 className="text-3xl font-bold">
        Upcoming Events
      </h1>

      <p className="mt-2 text-gray-600">
        Discover developer events, workshops, and meetups.
      </p>

      <SearchBar onSearch={setSearchTerm} />

      {loading ? (
        <p className="mt-8 text-lg">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="mt-8 text-lg text-gray-600">
          No events available yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              type={event.category}
            />
          ))}
        </div>
      )}
    </main>
  );
}