import "server-only";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { createR2Client, getR2Bucket } from "./r2-client";

const UPLOAD_URL_EXPIRES_IN_SECONDS = 10 * 60;
const DOWNLOAD_URL_EXPIRES_IN_SECONDS = 60;

let client: S3Client | undefined;
const getR2Client = () => (client ??= createR2Client());

/**
 * URL to PUT one file straight from the browser to the bucket. The upload
 * must send the same Content-Type, which is part of the signature.
 */
export const createPresignedUpload = ({
  key,
  contentType,
}: {
  key: string;
  contentType: string;
}) =>
  getSignedUrl(
    getR2Client(),
    new PutObjectCommand({
      Bucket: getR2Bucket(),
      Key: key,
      ContentType: contentType,
    }),
    {
      expiresIn: UPLOAD_URL_EXPIRES_IN_SECONDS,
      // Not signed by default: without this the browser could send any type.
      signableHeaders: new Set(["content-type"]),
    }
  );

/**
 * Short-lived URL that makes the browser save the file instead of showing it
 * (a plain link to another domain would only open the image).
 */
export const createPresignedDownload = ({
  key,
  filename,
}: {
  key: string;
  filename: string;
}) =>
  getSignedUrl(
    getR2Client(),
    new GetObjectCommand({
      Bucket: getR2Bucket(),
      Key: key,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    }),
    { expiresIn: DOWNLOAD_URL_EXPIRES_IN_SECONDS }
  );

/** Deletes the files; a failure is only logged. */
export const deleteR2Objects = async (keys: string[]) => {
  const results = await Promise.allSettled(
    keys.map((key) =>
      getR2Client().send(
        new DeleteObjectCommand({ Bucket: getR2Bucket(), Key: key })
      )
    )
  );

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Could not delete ${keys[i]} from R2`, result.reason);
    }
  });
};
