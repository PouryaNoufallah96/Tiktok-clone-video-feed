# Production-Ready Video Feed

A TikTok-style short video feed built with Next.js, showing how to go from raw MP4 files to a production-ready media experience with thumbnails, responsive transformations, watermarks, and adaptive bitrate streaming.

## The Problem

Shipping a video feed with raw MP4 files works for a prototype, but falls apart in production:

- No video thumbnails, so users see blank placeholders or loading spinners
- No resizing or cropping, so every device downloads the same oversized file
- No branding or way to watermark or overlay text on videos
- No adaptive streaming, so users on slow connections buffer endlessly

## The Solution

Each feature is implemented incrementally using [ImageKit](https://tinyurl.com/34ermy36) for URL-based video transformations. No re-encoding pipelines, no media servers, no FFmpeg on your backend. Just transform the URL and get what you need.

## Branches

### `main`

The starting point - a fully functional TikTok-style UI that serves raw MP4 videos with no optimizations. This is the baseline that shows the gaps in a naive video feed implementation.

### `solution`

The production-ready version with all video delivery features layered in, one commit at a time:

1. **Video Thumbnails** - Generate preview thumbnails from any video frame via URL
2. **Resize & Crop Transformations** - Smart crop, pad resize, and aspect ratio control for different layouts
3. **Text Overlay Watermarks** - Brand videos with text overlays directly through URL parameters
4. **HLS Adaptive Bitrate Streaming** - Serve video with adaptive bitrate using hls.js so playback adapts to network conditions

## Getting Started

1. Fork this repo, then clone your fork and install dependencies:

```bash
git clone https://github.com/<your-username>/Tiktok-feed.git
cd Tiktok-feed
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

To follow along with the video, stay on the `main` branch - it's the starting point where you'll build from. If you want to see the finished solutions, switch to the `solution` branch:

```bash
git checkout solution
```

Each commit on `solution` adds one feature at a time, so you can step through them to see how each optimization was implemented.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [ImageKit](https://tinyurl.com/34ermy36) - Video optimization, transformations, and delivery
- [hls.js](https://github.com/video-dev/hls.js/) - HLS adaptive playback in the browser
- [Tailwind CSS](https://tailwindcss.com) - Styling
