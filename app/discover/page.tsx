import DiscoverGrid from "@/components/DiscoverGrid";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <h1 className="text-lg font-bold text-center">Discover</h1>
        {/* Search bar */}
        <div className="mt-2 flex items-center bg-zinc-800 rounded-lg px-3 py-2 gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-white placeholder-white/40 outline-none flex-1"
            readOnly
          />
        </div>
      </div>

      {/* Video transformation showcase grid */}
      <div className="mt-2">
        <DiscoverGrid />
      </div>
    </div>
  );
}
