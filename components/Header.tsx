import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white p-5">
      <nav className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          DevPulse
        </h1>

        <div className="flex gap-6">
          <Link href="/">
            Home
          </Link>

          <Link href="/events">
            Events
          </Link>
        </div>

      </nav>
    </header>
  );
}