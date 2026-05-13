"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Video as VideoType,
  IMAGEKIT_URL_ENDPOINT,
} from "@/lib/constants";
import ActionBar from "./ActionBar";
import CreatorInfo from "./CreatorInfo";

type VideoCardProps = {
  video: VideoType;
};

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  // Raw MP4 — no streaming, no optimization
  const videoSrc = `${IMAGEKIT_URL_ENDPOINT}${video.videoPath}`;

  // Auto-play/pause based on scroll visibility
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  const togglePlay = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }

    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 600);
  }, []);

  return (
    <div className="snap-item relative w-full bg-black flex items-center justify-center">
      {/* Video — raw MP4, no poster */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onClick={togglePlay}
      />

      {/* Play/Pause icon overlay */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/40 rounded-full p-5 animate-[fadeOut_0.6s_ease-out_forwards]">
            {isPlaying ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />

      {/* Creator info - bottom left */}
      <div className="absolute bottom-20 left-3 z-20">
        <CreatorInfo
          username={video.username}
          description={video.description}
          musicName={video.musicName}
          avatarPath={video.avatarPath}
        />
      </div>

      {/* Action bar - bottom right */}
      <div className="absolute bottom-24 right-3 z-20">
        <ActionBar
          likes={video.likes}
          comments={video.comments}
          shares={video.shares}
          bookmarks={video.bookmarks}
        />
      </div>
    </div>
  );
}
