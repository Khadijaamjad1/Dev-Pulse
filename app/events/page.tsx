"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { events } from "@/lib/events";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();

    return (
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">

      <h1 className="text-3xl font-bold">
        Upcoming Events
      </h1>

      <p className="mt-2 text-gray-600">
        Discover developer events, workshops, and meetups.
      </p>

      <SearchBar onSearch={setSearchTerm} />

<div className="mt-8 flex flex-col gap-6">
  {filteredEvents.map((event) => (
    <EventCard
      key={event.id}
      id={event.id}
      title={event.title}
      description={event.description}
      date={event.date}
      category={event.category}
    />
  ))}
</div>

    </main>
  );
}