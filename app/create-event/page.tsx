"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Web Development");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      }
    }

    checkUser();
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get the currently logged-in user
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Please login before creating an event.");
      router.push("/login");
      return;
    }

    // Insert event with the user's ID
    const { error } = await supabase.from("events").insert([
      {
        user_id: userData.user.id,
        title,
        description,
        date,
        location,
        category,
        status: "pending",
      },
    ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Event submitted successfully! Waiting for admin approval.");

    // Go back to events page
    router.push("/events");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-gray-900">
          Create New Event
        </h1>

        <p className="mt-3 text-gray-600">
          Share your hackathon, workshop, meetup, or conference with
          Pakistan's developer community.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Event Title
            </label>

            <input
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe your event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                placeholder="Islamabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option>Web Development</option>
              <option>Artificial Intelligence</option>
              <option>Cyber Security</option>
              <option>Mobile Development</option>
              <option>Open Source</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 py-3 text-lg font-semibold text-white hover:bg-purple-700"
          >
            Create Event
          </button>

        </form>
      </div>
    </main>
  );
}