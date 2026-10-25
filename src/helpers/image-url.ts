/** Public URL of the R2 bucket, without the trailing slash. */
export const r2PublicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "").replace(
  /\/+$/,
  ""
);

/** Hosts of the images saved before the R2 upload (Google Drive and Wix). */
const LEGACY_IMAGE_HOSTS = [
  "drive.google.com",
  "lh3.googleusercontent.com",
  "static.wixstatic.com",
];

export const isR2Url = (url: string) =>
  !!r2PublicUrl && url.startsWith(`${r2PublicUrl}/`);

/** Key of the file in the bucket, or null when the URL is not from R2. */
export const r2KeyFromUrl = (url: string) =>
  isR2Url(url) ? decodeURIComponent(url.slice(r2PublicUrl.length + 1)) : null;

export const r2UrlFromKey = (key: string) => `${r2PublicUrl}/${key}`;

export const isLegacyImageUrl = (url: string) => {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && LEGACY_IMAGE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
};
