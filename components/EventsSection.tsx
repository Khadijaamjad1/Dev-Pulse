import EventCard from "./EventCard";
import { events } from "@/lib/events";

export default function EventsSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          Upcoming Events
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Discover the latest tech events happening across Pakistan.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id.toString()}
              title={event.title}
              date={event.date}
              location={event.location}
              type={event.category}
            />
          ))}

        </div>

      </div>
    </section>
  );
}