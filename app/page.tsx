import { SAMPLE_VIDEOS } from "@/lib/constants";
import VideoFeed from "@/components/VideoFeed";

export default function Home() {
  return <VideoFeed videos={SAMPLE_VIDEOS} />;
}
