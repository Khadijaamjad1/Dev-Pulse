import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
          🇵🇰 Pakistan's Tech Community
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Discover Tech Events,
          <br />
          Hackathons & Workshops
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Explore hackathons, internships, workshops, conferences and
          developer meetups happening across Pakistan—all in one place.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/events"
            className="rounded-xl bg-purple-600 px-8 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Explore Events
          </Link>


          <Link
            href="/create-event"
            className="rounded-xl border border-purple-600 px-8 py-3 font-semibold text-purple-600 transition hover:bg-purple-50"
          >
            Post Event
          </Link>

        </div>

      </div>
    </section>
  );
}