"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
};

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {

  const { id } = use(params);

  const [event, setEvent] = useState<Event | null>(null);
  const [attending, setAttending] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchEvent() {

      const { data, error } = await supabase
        .from("events")
        .select("*")
      
        .eq("id", id)
        .single();


      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }


      setEvent(data);
      setAttendeeCount(data.attendees ?? 0);
      setLoading(false);

    }


    fetchEvent();

  }, [id]);



  function handleAttend() {

    if (!attending) {
      setAttendeeCount(attendeeCount + 1);
      setAttending(true);
    }

  }



  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">
          Loading event...
        </h1>
      </main>
    );
  }



  if (!event) {
    return (
      <main className="min-h-screen p-8">

        <h1 className="text-3xl font-bold">
          Event not found
        </h1>

        <Link href="/events">
          <button className="mt-6 rounded-lg bg-black px-5 py-2 text-white">
            ← Back to Events
          </button>
        </Link>

      </main>
    );
  }



  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 p-8">


      <Link href="/events">

        <button className="mb-6 rounded-lg bg-black px-5 py-2 text-white">
          ← Back to Events
        </button>

      </Link>



      <div className="max-w-3xl rounded-2xl bg-white p-8 shadow-md">


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



        <span className="mt-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-blue-700">
          {event.type}
        </span>



        <button
          onClick={handleAttend}
          className="mt-8 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          {attending ? "You're Attending ✓" : "I'm Attending"}
        </button>


      </div>


    </main>
  );
}