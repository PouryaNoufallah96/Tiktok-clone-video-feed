"use client";

import { Image } from "@imagekit/next";
import { IMAGEKIT_URL_ENDPOINT } from "@/lib/constants";

type CreatorInfoProps = {
  username: string;
  description: string;
  musicName: string;
  avatarPath: string;
};

export default function CreatorInfo({
  username,
  description,
  musicName,
  avatarPath,
}: CreatorInfoProps) {
  return (
    <div className="flex flex-col gap-3 max-w-[75%]">
      {/* Username with avatar */}
      <div className="flex items-center gap-2">
        <Image
          urlEndpoint={IMAGEKIT_URL_ENDPOINT}
          src={avatarPath}
          alt={username}
          width={40}
          height={40}
          className="rounded-full object-cover"
          transformation={[
            {
              width: "80",
              height: "80",
              focus: "face",
            },
          ]}
        />
        <span className="font-bold text-sm">@{username}</span>
        <button className="ml-2 border border-white/50 rounded px-3 py-0.5 text-xs font-semibold">
          Follow
        </button>
      </div>

      {/* Description */}
      <p className="text-sm leading-snug line-clamp-2">{description}</p>

      {/* Music */}
      <div className="flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="1"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <div className="overflow-hidden max-w-[200px]">
          <p className="text-xs text-white/80 whitespace-nowrap animate-[marquee_5s_linear_infinite]">
            {musicName}
          </p>
        </div>
      </div>
    </div>
  );
}
