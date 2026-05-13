import { SAMPLE_VIDEOS } from "@/lib/constants";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfilePage() {
  return (
    <div className="h-dvh pb-20 overflow-y-auto">
      <ProfileHeader
        username="coby"
        displayName="Coby"
        bio="Full-stack developer | Building cool stuff with Next.js & ImageKit"
        avatarPath="/default-image.jpg"
        stats={{ posts: 142000, followers: 28500, following: 890 }}
      />

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button className="flex-1 py-3 text-center text-sm font-semibold border-b-2 border-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <button className="flex-1 py-3 text-center text-sm text-white/40">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Placeholder video grid — we'll add ImageKit thumbnails here */}
      <div className="grid grid-cols-3 gap-0.5">
        {SAMPLE_VIDEOS.map((video) => (
          <div key={video.id} className="relative aspect-9/16 bg-zinc-900 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
