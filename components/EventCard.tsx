import Link from "next/link";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  description?: string;
};

export default function EventCard({
  id,
  title,
  date,
  location,
  type,
  description,
}: EventCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
        {type}
      </span>

      <h3 className="mt-5 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <div className="mt-3 space-y-1 text-gray-600">
        <p>📅 {date}</p>
        <p>📍 {location}</p>
      </div>

      {description && (
        <p className="mt-4 line-clamp-3 text-sm text-gray-500">
          {description}
        </p>
      )}

      <Link
        href={`/events/${id}`}
        className="mt-6 inline-block rounded-xl bg-purple-600 px-5 py-2 font-semibold text-white transition hover:bg-purple-700"
      >
        View Details
      </Link>

    </div>
  );
}