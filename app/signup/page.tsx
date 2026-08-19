"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);


    const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name,
    },
  },
});



    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }


    router.push("/login");
    router.refresh();
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-center text-purple-600">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Join the DevPulse community
        </p>


        <form onSubmit={handleSignup} className="mt-6 space-y-4">


          <div>
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-purple-600"
              required
            />
          </div>



          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-purple-600"
              required
            />
          </div>



          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-purple-600"
              required
            />
          </div>



          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-purple-600"
              required
            />
          </div>



          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}



          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-2 text-white font-medium transition hover:bg-purple-700"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>


        </form>



        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </p>


      </div>

    </div>
  );
}