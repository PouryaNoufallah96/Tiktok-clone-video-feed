"use client";

import { Video } from "@/lib/constants";
import VideoCard from "./VideoCard";

type VideoFeedProps = {
  videos: Video[];
};

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="snap-container">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
