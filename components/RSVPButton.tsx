"use client";

import { useState } from "react";

export default function RSVPButton() {
  const [joined, setJoined] = useState(false);

  return (
    <button
      onClick={() => setJoined(true)}
      className="mt-5 px-5 py-2 rounded-lg bg-black text-white"
    >
      {joined ? "You're attending ✅" : "RSVP Now"}
    </button>
  );
}