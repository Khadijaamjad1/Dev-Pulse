"use client";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search events..."
      onChange={(e) => onSearch(e.target.value)}
      className="
      mt-6
      w-full
      rounded-xl
      border
      border-gray-200
      bg-white
      px-5
      py-3
      text-gray-700
      shadow-sm
      outline-none
      transition
      focus:ring-2
      focus:ring-blue-400
      "
    />
  );
}