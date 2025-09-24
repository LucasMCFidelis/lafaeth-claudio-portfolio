"use server";

import { eq } from "drizzle-orm";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const getImage = async ({
  imageId,
}: {
  imageId: string;
}): Promise<ImageDTO> => {
  const image = await db.query.imagesTable.findFirst({
    where: eq(imagesTable.id, imageId),
  });

  if (!image) throw new Error(`Image ${imageId} not found`);

  return mapToImageDTO({ image });
};
