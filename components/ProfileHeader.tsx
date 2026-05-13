"use client";

import { IMAGEKIT_URL_ENDPOINT, formatCount } from "@/lib/constants";

type ProfileHeaderProps = {
  username: string;
  displayName: string;
  bio: string;
  avatarPath: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
};

export default function ProfileHeader({
  username,
  displayName,
  bio,
  avatarPath,
  stats,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-8 pb-4 px-4">
      {/* Avatar — plain img, no smart crop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMAGEKIT_URL_ENDPOINT}${avatarPath}`}
        alt={displayName}
        width={96}
        height={96}
        className="rounded-full object-cover border-2 border-white/20"
      />

      <h1 className="mt-3 text-lg font-bold">{displayName}</h1>
      <p className="text-sm text-white/60">@{username}</p>

      {/* Stats */}
      <div className="flex gap-8 mt-4">
        <div className="flex flex-col items-center">
          <span className="font-bold">{formatCount(stats.following)}</span>
          <span className="text-xs text-white/60">Following</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{formatCount(stats.followers)}</span>
          <span className="text-xs text-white/60">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{formatCount(stats.posts)}</span>
          <span className="text-xs text-white/60">Likes</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-center text-white/80">{bio}</p>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <button className="bg-[#fe2c55] text-white font-semibold text-sm px-8 py-2 rounded">
          Follow
        </button>
        <button className="bg-zinc-800 text-white font-semibold text-sm px-4 py-2 rounded">
          Message
        </button>
        <button className="bg-zinc-800 text-white px-3 py-2 rounded">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
