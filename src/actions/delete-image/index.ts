"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { after } from "next/server";
import z from "zod";

import deleteUnusedImageFiles from "@/app/data/image/delete-unused-image-files";
import getImagesUsage from "@/app/data/image/get-images-usage";
import {
  emptyImageUsage,
  ImageUsage,
  isImageInUse,
} from "@/app/data/image/image-usage-dto";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

const deleteImageSchema = z.object({
  imageId: z.uuid("id invalido"),
  /** Delete even if colorizations, comics, flats or the banner use it. */
  force: z.boolean().default(false),
});

export type DeleteImageResult =
  { deleted: true } | { deleted: false; usage: ImageUsage };

/**
 * Removes an image from the library. When the image is in use and `force`
 * is false, nothing is deleted and the usage is returned so the admin can
 * confirm (a thrown message would be hidden in production).
 */
export const deleteImage = async (
  data: z.input<typeof deleteImageSchema>
): Promise<DeleteImageResult> => {
  const { imageId, force } = deleteImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const usage = (await getImagesUsage([imageId]))[imageId] ?? emptyImageUsage();
  if (isImageInUse(usage) && !force) return { deleted: false, usage };

  // Items that used the image keep existing without it (on delete set null).
  const [deleted] = await db
    .delete(imagesTable)
    .where(eq(imagesTable.id, imageId))
    .returning({ id: imagesTable.id, imageUrl: imagesTable.imageUrl });

  if (!deleted) throw new Error("Image not found");

  // Every public list (and the home banner) is also tagged with images.
  updateTag(cacheTags.images);
  after(() => deleteUnusedImageFiles([deleted.imageUrl]));

  return { deleted: true };
};
