import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Public pages are served from the "use cache" data reads (see src/app/data)
  // and refreshed by updateTag() in the server actions that write.
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Google Drive sends no cache headers, so without this the optimizer
    // fetched the originals again every few hours. There is no way to purge
    // it: an image replaced in Drive under the same file id can take up to
    // 31 days to update (a new upload gets a new id and shows right away).
    minimumCacheTTL: 2678400,
    formats: ["image/avif", "image/webp"],
    // 75 is the default; 90 is used by the home banner, which is shown at
    // full screen width and shows compression artifacts at 75.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
