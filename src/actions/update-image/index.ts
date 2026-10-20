"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import {
  UpdateImageDTO,
  updateImageSchema,
} from "@/app/data/schemas/update-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateImage = async (
  imageId: string,
  data: UpdateImageDTO
): Promise<ImageDTO> => {
  // The id comes from the argument; the one in the body is only validated.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...dataValidated } = updateImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [updatedImage] = await db
    .update(imagesTable)
    .set({
      ...dataValidated,
      // An image hidden from the home page loses its position there.
      ...(dataValidated.visibleInHome === false && { index: null }),
    })
    .where(eq(imagesTable.id, imageId))
    .returning();

  if (!updatedImage) throw new Error("Image not found");

  updateTag(cacheTags.images);

  return mapToImageDTO({ image: updatedImage });
};
