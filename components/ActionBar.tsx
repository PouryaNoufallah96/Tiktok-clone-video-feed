"use client";

import { useState } from "react";
import { formatCount } from "@/lib/constants";

type ActionBarProps = {
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
};

export default function ActionBar({
  likes,
  comments,
  shares,
  bookmarks,
}: ActionBarProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Like */}
      <button
        onClick={() => setLiked(!liked)}
        className="flex flex-col items-center gap-1"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={liked ? "#fe2c55" : "none"}
          stroke={liked ? "#fe2c55" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-xs font-semibold">
          {formatCount(liked ? likes + 1 : likes)}
        </span>
      </button>

      {/* Comment */}
      <button className="flex flex-col items-center gap-1">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-xs font-semibold">{formatCount(comments)}</span>
      </button>

      {/* Share */}
      <button className="flex flex-col items-center gap-1">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span className="text-xs font-semibold">{formatCount(shares)}</span>
      </button>

      {/* Bookmark */}
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className="flex flex-col items-center gap-1"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={bookmarked ? "#fbbf24" : "none"}
          stroke={bookmarked ? "#fbbf24" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-xs font-semibold">
          {formatCount(bookmarked ? bookmarks + 1 : bookmarks)}
        </span>
      </button>

      {/* Spinning Album */}
      <div className="mt-1 w-10 h-10 rounded-full bg-linear-to-br from-zinc-700 to-zinc-900 border-2 border-zinc-600 animate-[spin_3s_linear_infinite] flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-zinc-400" />
      </div>
    </div>
  );
}
