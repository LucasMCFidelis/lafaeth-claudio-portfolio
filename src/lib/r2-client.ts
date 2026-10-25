import { S3Client } from "@aws-sdk/client-s3";

/**
 * S3 client for Cloudflare R2. It has no "server-only" import so the scripts
 * in scripts/ can use it too; the app uses it through src/lib/r2.ts. Never
 * import it from client components.
 */
export const createR2Client = () =>
  new S3Client({
    region: "auto",
    endpoint: `https://${requireEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
    // Recent SDK versions add checksums to every request, which breaks
    // presigned uploads to R2. Only send them when an operation requires one.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

export const getR2Bucket = () => requireEnv("R2_BUCKET_NAME");

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} not defined in env variables`);
  return value;
}
