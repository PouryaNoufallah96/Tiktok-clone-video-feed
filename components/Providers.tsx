"use client";

import { ImageKitProvider } from "@imagekit/next";
import { IMAGEKIT_URL_ENDPOINT } from "@/lib/constants";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ImageKitProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>
      {children}
    </ImageKitProvider>
  );
}
