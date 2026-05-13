"use client";

import { IMAGEKIT_URL_ENDPOINT, SAMPLE_VIDEOS } from "@/lib/constants";

// Each card demonstrates a different ImageKit video transformation
const transformations = [
  {
    label: "Thumbnail at 1s",
    description: "ik-thumbnail.jpg?tr=so-1",
    getUrl: (videoPath: string) =>
      `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-1,w-400,h-500`,
  },
  {
    label: "Thumbnail at 3s",
    description: "ik-thumbnail.jpg?tr=so-3",
    getUrl: (videoPath: string) =>
      `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-3,w-400,h-500`,
  },
  {
    label: "Smart Crop",
    description: "tr=w-400,h-400,fo-auto",
    getUrl: (videoPath: string) =>
      `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-2,w-400,h-400,fo-auto`,
  },
  {
    label: "Square Crop",
    description: "tr=w-400,h-400,c-maintain_ratio",
    getUrl: (videoPath: string) =>
      `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-2,w-400,h-400,c-maintain_ratio`,
  },
  {
    label: "Pad Resize",
    description: "tr=w-400,h-400,cm-pad_resize",
    getUrl: (videoPath: string) =>
      `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-1,w-400,h-400,cm-pad_resize,bg-111111`,
  },
  {
    label: "Text Overlay",
    description: "l-text,i-@coby,fs-40",
    getUrl: (videoPath: string) => {
      const encodedText = btoa("@coby");
      return `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-2,w-400,h-500,l-text,i-${encodedText},fs-40,co-FFFFFF,lx-20,ly-20,l-end`;
    },
  },
];

export default function DiscoverGrid() {
  const videoPath = SAMPLE_VIDEOS[0].videoPath;

  return (
    <div className="grid grid-cols-2 gap-2 px-2">
      {transformations.map((transform, index) => (
        <div
          key={index}
          className="rounded-lg overflow-hidden relative aspect-4/5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={transform.getUrl(videoPath)}
            alt={transform.label}
            className="w-full h-full object-cover"
          />
          {/* Transformation label overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-2 pt-6">
            <p className="text-xs font-bold text-white">{transform.label}</p>
            <p className="text-[10px] text-white/60 font-mono">
              {transform.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
