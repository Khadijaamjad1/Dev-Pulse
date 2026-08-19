"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Notification = {
  id: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setNotifications(data || []);
      setLoading(false);
    }

    fetchNotifications();
  }, [router]);

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification
      )
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">
          Loading notifications...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 px-6 py-16">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Notifications
          </h1>

          <p className="mt-3 text-gray-600">
            Stay updated about your submitted events.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900">
              No notifications
            </h2>

            <p className="mt-2 text-gray-600">
              You don't have any notifications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl bg-white p-6 shadow-lg border-l-4 ${
                  notification.type === "approval"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p
                      className={`font-medium ${
                        notification.is_read
                          ? "text-gray-600"
                          : "text-gray-900"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        notification.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="whitespace-nowrap rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                    >
                      Mark as read
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}