"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Event = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  status: string;
};

export default function MyEventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyEvents() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setEvents(data || []);
      setLoading(false);
    }

    fetchMyEvents();
  }, [router]);

  async function deleteEvent(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
      .eq("user_id", userData.user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">
          Loading your events...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Events
          </h1>

          <p className="mt-3 text-gray-600">
            Manage the events you have submitted to DevPulse.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900">
              No events yet
            </h2>

            <p className="mt-2 text-gray-600">
              You haven't submitted any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
            >
              Post Your First Event
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl bg-white p-6 shadow-lg"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {event.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      {event.description}
                    </p>

                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                      <p>📅 {event.date}</p>
                      <p>📍 {event.location}</p>
                      <p>🏷️ {event.category}</p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${
                        event.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : event.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status === "approved"
                        ? "Approved"
                        : event.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 border-t pt-5">
                  <Link
                    href={`/edit-event/${event.id}`}
                    className="rounded-xl bg-purple-600 px-5 py-2 font-medium text-white transition hover:bg-purple-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="rounded-xl border border-red-500 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}