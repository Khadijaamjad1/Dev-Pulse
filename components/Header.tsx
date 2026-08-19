"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "khadijaahmed12701@gmail.com";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  async function fetchUnreadCount(currentUser: User | null) {
    if (!currentUser) {
      setUnreadCount(0);
      return;
    }

    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", currentUser.id)
      .eq("is_read", false);

    if (error) {
      console.error("Error fetching notifications:", error);
      return;
    }

    setUnreadCount(count || 0);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      fetchUnreadCount(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);
      fetchUnreadCount(currentUser);
    });

    // Header scroll animation
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setUnreadCount(0);
  }

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-500 ${
        scrolled
          ? "border-purple-200 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 shadow-lg"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-bold transition-colors duration-500 ${
            scrolled ? "text-white" : "text-purple-600"
          }`}
        >
          DevPulse
        </Link>

        {/* Navigation */}
        <nav
          className={`ml-10 flex flex-1 items-center gap-8 font-medium transition-colors duration-500 ${
            scrolled ? "text-white" : "text-gray-700"
          }`}
        >
        

          <Link
            href="/events"
            className="transition-all duration-300 hover:scale-105 hover:text-purple-200"
          >
            Events
          </Link>

          {user && (
            <>
              <Link
                href="/my-events"
                className="transition-all duration-300 hover:scale-105 hover:text-purple-200"
              >
                My Events
              </Link>

              <Link
                href="/notifications"
                className="transition-all duration-300 hover:scale-105 hover:text-purple-200"
              >
                <span className="flex items-center gap-2">
                  Notifications

                  {unreadCount > 0 && (
                    <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-purple-600 shadow-md animate-pulse">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            </>
          )}

          {/* Admin only */}
          {isAdmin && (
            <Link
              href="/admin"
              className="transition-all duration-300 hover:scale-105 hover:text-purple-200"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {user ? (
            <>
              <span
                className={`text-sm transition-colors duration-500 ${
                  scrolled ? "text-white" : "text-gray-600"
                }`}
              >
                Hi, {user.user_metadata?.name || "User"} 👋
              </span>

              <button
                onClick={handleLogout}
                className={`rounded-xl border px-5 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? "border-white text-white hover:bg-white hover:text-purple-600"
                    : "border-purple-600 text-purple-600 hover:bg-purple-50"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`rounded-xl border px-5 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "border-white text-white hover:bg-white hover:text-purple-600"
                  : "border-purple-600 text-purple-600 hover:bg-purple-50"
              }`}
            >
              Login
            </Link>
          )}

          <Link
            href="/create-event"
            className="rounded-xl bg-purple-600 px-5 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-lg"
          >
            Post Event
          </Link>

        </div>
      </div>
    </header>
  );
}