"use client";

import { useEffect, useState } from "react";
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

const ADMIN_EMAIL = "khadijaahmed12701@gmail.com";

export default function AdminPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);

  // Check if current user is admin
  useEffect(() => {
    async function checkAdmin() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      // Check admin email
      if (data.user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }

      // User is admin
      setCheckingAccess(false);
    }

    checkAdmin();
  }, [router]);

  // Fetch pending events
  async function fetchPendingEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setEvents(data || []);
  }

  // Only fetch events after admin access is confirmed
  useEffect(() => {
    if (!checkingAccess) {
      fetchPendingEvents();
    }
  }, [checkingAccess]);

  // Approve or reject event
  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    setMessage("");

    // Get event owner's user ID and title
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("user_id, title")
      .eq("id", id)
      .single();

    if (eventError || !event) {
      console.error(eventError);

      setMessage("Could not find the event.");
      setUpdating(null);

      return;
    }

    // Update event status
    const { error: updateError } = await supabase
      .from("events")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);

      setMessage("Something went wrong.");
      setUpdating(null);

      return;
    }

    // Create notification
    const notificationMessage =
      status === "approved"
        ? `Your event "${event.title}" has been approved!`
        : `Your event "${event.title}" has been rejected.`;

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: event.user_id,
          message: notificationMessage,
          type: status === "approved" ? "approval" : "rejection",
          is_read: false,
        },
      ]);

    if (notificationError) {
      console.error(notificationError);
    }

    setMessage(
      status === "approved"
        ? "Event approved successfully!"
        : "Event rejected successfully!"
    );

    setUpdating(null);

    fetchPendingEvents();
  }

  if (checkingAccess) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">
          Checking admin access...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="mb-5 text-3xl font-bold">
        Admin Event Approval
      </h1>

      {message && (
        <p className="mb-6 font-medium text-green-600">
          {message}
        </p>
      )}

      {events.length === 0 ? (
        <p>
          No pending events 🎉
        </p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="mb-5 rounded-xl border bg-white p-6 shadow"
          >
            <h2 className="text-xl font-bold">
              {event.title}
            </h2>

            <p className="mt-2">
              {event.description}
            </p>

            <p className="mt-2">
              📍 {event.location}
            </p>

            <p>
              📅 {event.date}
            </p>

            <p>
              Category: {event.category}
            </p>

            <div className="mt-5 flex gap-4">
              <button
                onClick={() =>
                  updateStatus(event.id, "approved")
                }
                disabled={updating === event.id}
                className="
                  rounded-lg
                  bg-green-600
                  px-5
                  py-2
                  text-white
                  disabled:opacity-50
                "
              >
                {updating === event.id
                  ? "Updating..."
                  : "Approve"}
              </button>

              <button
                onClick={() =>
                  updateStatus(event.id, "rejected")
                }
                disabled={updating === event.id}
                className="
                  rounded-lg
                  bg-red-600
                  px-5
                  py-2
                  text-white
                  disabled:opacity-50
                "
              >
                {updating === event.id
                  ? "Updating..."
                  : "Reject"}
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}