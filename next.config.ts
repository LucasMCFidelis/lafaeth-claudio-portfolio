import type { NextConfig } from "next";

// Public URL of the R2 bucket where the admin uploads the images.
const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // Public pages are served from the "use cache" data reads (see src/app/data)
  // and refreshed by updateTag() in the server actions that write.
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Google Drive sends no cache headers, so without this the optimizer
    // fetched the originals again every few hours. There is no way to purge
    // it: an image replaced in Drive under the same file id can take up to
    // 31 days to update. R2 uploads always get a new file name, so they
    // show right away.
    minimumCacheTTL: 2678400,
    // The optimizer reads source images up to 50 MB by default. Uploads can
    // be up to 100 MB (MAX_IMAGE_UPLOAD_BYTES in src/helpers/image-upload.ts).
    maximumResponseBody: 100 * 1024 * 1024,
    formats: ["image/avif", "image/webp"],
    // 75 is the default; 90 is used by the home banner, which is shown at
    // full screen width and shows compression artifacts at 75.
    qualities: [75, 90],
    remotePatterns: [
      ...(r2PublicUrl ? [new URL(`${r2PublicUrl}/**`)] : []),
      // Images saved before the R2 upload. Remove once
      // scripts/migrate-images-to-r2.ts has moved them all.
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
