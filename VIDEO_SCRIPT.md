# Next.js Video Streaming with ImageKit — Video Script

Target keyword: "Next js video streaming"

---

## HOOK (0:00 - 0:30)

If you want to build a modern SaaS, a creator platform, or a TikTok clone in Next.js 15, you are going to hit a wall immediately. I see developers constantly trying to build media apps by just throwing 50MB .mp4 files and massive .pngs into an S3 bucket and serving them directly to the user. It is a terrible idea. Your app will crawl, your Lighthouse score will tank, and mobile users will sit there watching a loading spinner.

Today, we are going to build a production-ready video feed from scratch. I am going to go to the whiteboard, show you how big tech actually handles streaming video, and then we are going to write the code. Huge shoutout to ImageKit for sponsoring this build, let's get into it.

---

## THE PROBLEM — WHITEBOARD (0:30 - 2:00)

Here is the problem.

If a user on bad 4G asks your server for a video and you send a raw MP4, they choke. The browser has to download the entire file — or at least buffer huge chunks — before playback starts. On a slow connection, the user just sees a spinner.

Netflix, YouTube, and TikTok solve this with **HLS — HTTP Live Streaming**, also called Adaptive Bitrate Streaming. Here's how it works:

1. The video gets split into small chunks — a few seconds each
2. Those chunks get encoded at multiple quality levels — 240p, 360p, 480p, 720p
3. A master manifest file lists all available qualities
4. The player picks the right quality based on the user's bandwidth — and switches on the fly

To build this yourself you would need FFMPEG transcoding servers, storage for every quality variant, a CDN, and a manifest generator. We are not doing any of that. We are using an API.

---

## IMAGEKIT INTRO — SPONSOR SEGMENT (2:00 - 3:30)

This brings us to ImageKit. They are a complete media processing API. They handle all of this at the edge.

**[Screen: imagekit.io/docs/integration/connect-external-storage]**
You don't even have to move your files. They have an AI-powered DAM, but you can plug ImageKit directly into your existing AWS S3 bucket, Azure, or Google Cloud Storage.

**[Screen: imagekit.io/docs/transformations]**
Look at their API. You want to resize a video? Add a URL parameter. Want a thumbnail at second 5? URL parameter. Smart crop with AI? URL parameter. Dynamic watermarks? URL parameter. And most importantly — they convert your videos into HLS streams instantly.

**[Screen: imagekit.io/docs/quick-start-guides]**
We are going to use their Next.js SDK to build our feed today. I will be doing all of this on their Forever Free plan, so click the link in the description, grab your free account, and let's start writing some code.

> All of these features work for images too — resize, crop, smart crop, overlays — same URL-based API.

---

## THE BUILD — PART 1: PROJECT SETUP (3:30 - 5:00)

**[Screen: VS Code]**

We start with a basic Next.js app. I have a TikTok-style layout already set up — a centered feed with snap scrolling, bottom navigation, a profile page, and a discover page. The shell is ready, we just need to add the video magic.

Let me walk you through the key files:

- `lib/constants.ts` — this is where all our ImageKit helper functions live
- `components/VideoCard.tsx` — the main video player component
- `components/DiscoverGrid.tsx` — showcases different transformations
- `app/profile/page.tsx` — thumbnail grid of all videos

First, install the dependencies:

```bash
npm install hls.js @imagekit/next
```

---

## THE BUILD — PART 2: VIDEO THUMBNAILS (5:00 - 8:00)

**[Screen: constants.ts]**

The first feature — video thumbnails. With ImageKit, you can extract a frame from any point in a video as a JPG. No ffmpeg, no server processing.

```ts
export function getVideoThumbnail(videoPath: string, time: number, width = 200, height = 356): string {
  return `${IMAGEKIT_URL_ENDPOINT}${videoPath}/ik-thumbnail.jpg?tr=so-${time},w-${width},h-${height}`;
}
```

That's it. `so-1` grabs the frame at 1 second. `so-5` grabs at 5 seconds. You can resize it on the fly — `w-200,h-356` for a profile grid, `w-720,h-1280` for a full-screen poster.

**[Screen: Profile page]**

We use this on the profile page — every tile is a thumbnail pulled from a different timestamp of each video. Upload once, get thumbnails from any frame.

**[Screen: Discover page]**

On the discover page, we showcase different transformations side by side — same video, six different URL parameters, six different results.

---

## THE BUILD — PART 3: RESIZE AND CROP (8:00 - 11:00)

**[Screen: Discover page grid]**

Now let's talk about resize and crop. ImageKit gives you several crop modes, all via URL:

**Square Crop** — `c-maintain_ratio`
Crops from the center to hit your target dimensions. Simple, predictable. Good for grid layouts.

**Smart Crop** — `fo-auto`
This is the AI one. Instead of always cropping from the center, it analyzes the frame and finds the most interesting region — a face, text, or action. Then it crops around that. Same dimensions, smarter result.

**[Show both side by side on Discover page]**

See the difference? Square crop just takes the center. Smart crop found the subject and focused on it.

**Pad Resize** — `cm-pad_resize`
Instead of cropping, this adds padding to fit your target dimensions. Useful when you don't want to lose any content.

---

## THE BUILD — PART 4: TEXT OVERLAYS (11:00 - 13:00)

**[Screen: constants.ts]**

Next — text overlays. You can burn text onto a video or thumbnail without any video editor. All via URL.

```ts
export function getVideoWithOverlay(videoPath: string): string {
  const encodedText = btoa("@coby");
  return `${IMAGEKIT_URL_ENDPOINT}${videoPath}?tr=l-text,i-${encodedText},fs-30,co-FFFFFFCC,lx-20,ly-20,l-end`;
}
```

Breaking this down:
- `l-text` starts a text layer
- `i-` takes the base64 encoded text
- `fs-30` is font size
- `co-FFFFFFCC` is white at 80% opacity
- `lx-20,ly-20` positions it 20 pixels from the top-left
- `l-end` closes the layer

You can also overlay images — great for watermarks or logos. And you can time them — `lso-3,leo-8` makes the overlay appear only from seconds 3 to 8.

**[Screen: Discover page — Text Overlay card]**

Here it is on a thumbnail — "@coby" burned right into the image via URL.

---

## THE BUILD — PART 5: ADAPTIVE BITRATE STREAMING (13:00 - 18:00)

**[Screen: VideoCard.tsx]**

Now the big one — Adaptive Bitrate Streaming. This is what makes the video feed production-ready.

```ts
const hlsSrc = getHLSUrl(video.videoPath);
// https://ik.imagekit.io/.../video.mp4/ik-master.m3u8?tr=sr-240_360_480_720
```

One URL parameter — `sr-240_360_480_720` — tells ImageKit to generate four quality variants. That's it. No transcoding server. No pipeline.

We use hls.js to play this in the browser:

```ts
if (Hls.isSupported()) {
  const hls = new Hls({ startLevel: -1 }); // auto-select quality
  hls.loadSource(hlsSrc);
  hls.attachMedia(videoEl);
}
```

Safari has native HLS support, so we just set the src directly. For everything else, hls.js handles the manifest parsing and chunk loading.

**[Screen: Browser Network tab]**

Now let me show you what's actually happening. Open the Network tab. Filter by `m3u8`.

*[Scroll to a video]*

See that? Two requests appeared:
1. `ik-master.m3u8` — the master manifest, lists all four quality levels
2. `720p-pl.m3u8` — hls.js picked the 720p variant based on our bandwidth

Now clear the filter. Type `.ts`. These are the actual video chunks streaming in — each one is a few seconds of video at 720p.

**[Throttle to Slow 3G]**

Now watch what happens when I throttle to Slow 3G. Scroll to the next video...

*[Filter m3u8 again]*

See? It picked `240p-pl.m3u8` instead. The quality adapted automatically. Switch back to full speed, scroll to the next video — 720p again.

That is adaptive bitrate streaming. One upload, ImageKit generates the variants, hls.js picks the right one. Your users on fast wifi get crisp 720p. Users on a train get smooth 240p. No buffering, no spinner.

---

## VIDEO OPTIMIZATION NOTES (18:00 - 19:00)

A few things to note about optimization:

1. **Upload once, transform via URL** — you are not storing multiple versions. ImageKit transforms and caches on the edge.
2. **Thumbnails replace poster generation** — no need for a separate thumbnail service or ffmpeg scripts.
3. **HLS chunks are cached on the CDN** — first viewer triggers processing, subsequent viewers get edge-cached responses.
4. **All of this works for images too** — same URL transformation API for resize, crop, smart crop, overlays, format conversion.

---

## OUTRO (19:00 - 20:00)

So that is how you build a production-ready video streaming app in Next.js. We covered:

- **Video thumbnails** from any frame, any size
- **Smart crop and resize** with AI-powered focus detection
- **Text overlays** as watermarks — all via URL
- **Adaptive bitrate streaming** with automatic quality switching

No ffmpeg. No transcoding server. No complex media pipeline. Just URL parameters.

If you want to try this yourself, the link to ImageKit's free plan is in the description. The full source code for this project is on GitHub — link is also in the description.

If you learned something, hit subscribe. I will see you in the next one.
