"use server";

import {
  CreateImageUploadInput,
  createImageUploadSchema,
} from "@/app/data/schemas/create-image-upload-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { ACCEPTED_IMAGE_TYPES, IMAGE_CACHE_CONTROL } from "@/helpers/image-upload";
import { r2UrlFromKey } from "@/helpers/image-url";
import { createPresignedUpload } from "@/lib/r2";

export interface ImageUploadTarget {
  /** Presigned URL for the browser to PUT the file (valid for 10 minutes). */
  uploadUrl: string;
  /** Headers the PUT must send. Content-Type is part of the signature. */
  headers: Record<string, string>;
  /** Public URL of the file once uploaded, to save in the database. */
  publicUrl: string;
}

/**
 * Prepares the upload of one image straight from the browser to R2, so the
 * file does not go through the Next server. Nothing is saved in the database
 * here: the form saves publicUrl when it is submitted.
 */
export const createImageUploadUrl = async (
  data: CreateImageUploadInput
): Promise<ImageUploadTarget> => {
  const { contentType, folder } = createImageUploadSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const key = `${folder}/${crypto.randomUUID()}.${ACCEPTED_IMAGE_TYPES[contentType]}`;
  const uploadUrl = await createPresignedUpload({ key, contentType });

  return {
    uploadUrl,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": IMAGE_CACHE_CONTROL,
    },
    publicUrl: r2UrlFromKey(key),
  };
};
