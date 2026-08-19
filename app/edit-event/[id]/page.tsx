"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Web Development");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .eq("user_id", userData.user.id)
        .single();

      if (error || !data) {
        alert("Event not found or you don't have permission to edit it.");
        router.push("/my-events");
        return;
      }

      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date);
      setLocation(data.location);
      setCategory(data.category);

      setLoading(false);
    }

    fetchEvent();
  }, [id, router]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("events")
      .update({
        title,
        description,
        date,
        location,
        category,
      })
      .eq("id", id)
      .eq("user_id", userData.user.id);

    if (error) {
      console.error(error);
      alert(error.message);
      setSaving(false);
      return;
    }

    alert("Event updated successfully!");

    router.push("/my-events");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">
          Loading event...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-gray-900">
          Edit Event
        </h1>

        <p className="mt-3 text-gray-600">
          Update the information for your event.
        </p>

        <form onSubmit={handleUpdate} className="mt-10 space-y-6">

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Event Title
            </label>

            <input
              type="text"
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

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-purple-600 py-3 text-lg font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Event"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-events")}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}