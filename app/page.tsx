import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">

      <section className="flex flex-col items-center justify-center text-center px-8 py-24">

        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to DevPulse
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          Discover developer events, workshops, hackathons, and
          community meetups. Stay connected with the tech world
          and never miss an opportunity to learn.
        </p>


        <Link href="/events">
          <button
            className="
            mt-8
            px-8
            py-3
            rounded-xl
            bg-black
            text-white
            text-lg
            hover:bg-gray-800
            transition
            "
          >
            Explore Events
          </button>
        </Link>

      </section>


      <section className="px-8 pb-20">

        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why DevPulse?
        </h2>

        <div className="mt-10 flex flex-col gap-6 max-w-3xl mx-auto">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold">
              Developer Community
            </h3>
            <p className="mt-2 text-gray-600">
              Connect with developers and explore technology events.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold">
              Workshops & Learning
            </h3>
            <p className="mt-2 text-gray-600">
              Improve your skills through practical sessions.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold">
              Stay Updated
            </h3>
            <p className="mt-2 text-gray-600">
              Find upcoming events and opportunities easily.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}