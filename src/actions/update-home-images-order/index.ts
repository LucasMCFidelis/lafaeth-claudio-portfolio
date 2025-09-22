"use server";

import { eq } from "drizzle-orm";

import { ImageDTO } from "@/app/data/image/image-dto";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const updateHomeImagesOrder = async (images: Array<ImageDTO>) => {
  await db.transaction(async (tx) => {
    for (const [index, image] of images.entries()) {
      const imageHome = await tx.query.imagesTable.findFirst({
        where: eq(imagesTable.id, image.id),
      });
      if (!imageHome) throw new Error(`Image ${image.id} not found`);

      await tx
        .update(imagesTable)
        .set({ indexInHome: index })
        .where(eq(imagesTable.id, image.id));
    }
  });

  return { success: true };
};
