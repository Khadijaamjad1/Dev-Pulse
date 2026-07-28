"use client";

import Link from "next/link";
import { use, useState } from "react";
import { events } from "@/lib/events";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {

  const { id } = use(params);

  const event = events.find(
    (event) => event.id === Number(id)
  );

  const [attending, setAttending] = useState(false);

  const [attendeeCount, setAttendeeCount] = useState(
    event?.attendees ?? 0
  );


  if (!event) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">

        <h1 className="text-3xl font-bold">
          Event not found
        </h1>

        <Link href="/events">
          <button className="mt-6 px-5 py-2 rounded-lg bg-black text-white">
            ← Back to Events
          </button>
        </Link>

      </main>
    );
  }


  function handleAttend() {
    if (!attending) {
      setAttendeeCount(attendeeCount + 1);
      setAttending(true);
    }
  }


  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">


      <Link href="/events">
        <button
          className="
          mb-6
          px-5
          py-2
          rounded-lg
          bg-black
          text-white
          hover:bg-gray-800
          transition
          "
        >
          ← Back to Events
        </button>
      </Link>



      <div
        className="
        bg-white
        rounded-2xl
        p-8
        shadow-md
        max-w-3xl
        "
      >

        <h1 className="text-4xl font-bold text-gray-900">
          {event.title}
        </h1>


        <p className="mt-4 text-gray-600">
          {event.description}
        </p>


        <p className="mt-5 text-gray-500">
          📅 {event.date}
        </p>


        <p className="mt-3 text-gray-500">
          📍 {event.location}
        </p>


        <p className="mt-5 font-medium text-gray-700">
          👥 {attendeeCount} people attending
        </p>



        <span
          className="
          inline-block
          mt-5
          px-4
          py-2
          rounded-full
          bg-blue-100
          text-blue-700
          "
        >
          {event.category}
        </span>



        <button
          onClick={handleAttend}
          className="
          mt-8
          px-6
          py-3
          rounded-xl
          bg-black
          text-white
          hover:bg-gray-800
          transition
          "
        >
          {attending ? "You're Attending ✓" : "I'm Attending"}
        </button>


      </div>


    </main>
  );
}