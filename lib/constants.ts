import { buildSrc } from "@imagekit/next";

export const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/mhe9wyj4i";

export type Video = {
  id: string;
  username: string;
  displayName: string;
  description: string;
  musicName: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  videoPath: string;
  avatarPath: string;
  thumbnailTime: number; // seconds into video for thumbnail
};

// Helper to build raw MP4 URL using SDK
export function getRawVideoUrl(videoPath: string): string {
  return buildSrc({
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    src: videoPath,
  });
}

export const SAMPLE_VIDEOS: Video[] = [
  {
    id: "1",
    username: "coby",
    displayName: "Coby",
    description:
      "Next.js video streaming with ImageKit 🔥 Adaptive bitrate, thumbnails, overlays #nextjs #imagekit",
    musicName: "Lo-Fi Coding Beats",
    likes: 14200,
    comments: 892,
    shares: 2100,
    bookmarks: 5400,
    videoPath: "/sample-video.mp4",
    avatarPath: "/default-image.jpg",
    thumbnailTime: 1,
  },
  {
    id: "2",
    username: "coby",
    displayName: "Coby",
    description:
      "Build your own course platform with Next.js 🚀 Custom video player, auth, and more #nextjs #course",
    musicName: "Chill Code Vibes",
    likes: 28500,
    comments: 1340,
    shares: 4200,
    bookmarks: 8900,
    videoPath: "/Shorts_%20Next.js%20Custom%20Course%20Platform.mp4",
    avatarPath: "/default-image.jpg",
    thumbnailTime: 3,
  },
  {
    id: "3",
    username: "coby",
    displayName: "Coby",
    description:
      "How Amazon structures their monorepo 🏗️ Scaling frontend at enterprise level #monorepo #amazon",
    musicName: "Tech Talk Beats",
    likes: 9800,
    comments: 567,
    shares: 1500,
    bookmarks: 3200,
    videoPath: "/amazon-monorepo.mp4",
    avatarPath: "/default-image.jpg",
    thumbnailTime: 5,
  },
  {
    id: "4",
    username: "coby",
    displayName: "Coby",
    description:
      "Next.js custom course platform deep dive 🎓 Full-stack setup walkthrough #nextjs #fullstack",
    musicName: "Focus Mode",
    likes: 42000,
    comments: 2100,
    shares: 7800,
    bookmarks: 12000,
    videoPath: "/Shorts_%20Next.js%20Custom%20Course%20Platform.mp4",
    avatarPath: "/default-image.jpg",
    thumbnailTime: 2,
  },
  {
    id: "5",
    username: "coby",
    displayName: "Coby",
    description:
      "Amazon monorepo architecture explained 📦 Why big tech uses monorepos #architecture #webdev",
    musicName: "Dev Podcast Beats",
    likes: 31200,
    comments: 1890,
    shares: 5600,
    bookmarks: 9400,
    videoPath: "/amazon-monorepo.mp4",
    avatarPath: "/default-image.jpg",
    thumbnailTime: 4,
  },
];

export function formatCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}
