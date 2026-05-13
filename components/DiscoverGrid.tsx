"use client";

export default function DiscoverGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 px-2">
      {/* Placeholder grid — we'll add ImageKit transformations here */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-lg overflow-hidden relative aspect-4/5 bg-zinc-900 flex items-center justify-center"
        >
          <p className="text-xs text-white/30">Transformation {i}</p>
        </div>
      ))}
    </div>
  );
}
