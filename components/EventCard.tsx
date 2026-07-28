import Link from "next/link";

type EventCardProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
};

export default function EventCard({
  id,
  title,
  description,
  date,
  category,
}: EventCardProps) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-8
      shadow-md
      border
      border-gray-100
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      "
    >

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        <span className="
          px-3
          py-1
          rounded-full
          bg-blue-100
          text-blue-700
          text-sm
        ">
          {category}
        </span>
      </div>

      <p className="mt-4 text-gray-600">
        {description}
      </p>

      <p className="mt-5 text-sm text-gray-500">
        📅 {date}
      </p>

      <Link href={`/events/${id}`}>
        <button
          className="
          mt-6
          px-6
          py-3
          rounded-xl
          bg-black
          text-white
          transition
          hover:bg-gray-800
          "
        >
          View Details
        </button>
      </Link>

    </div>
  );
}