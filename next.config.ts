import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Public pages are served from the "use cache" data reads (see src/app/data)
  // and refreshed by updateTag() in the server actions that write.
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;
