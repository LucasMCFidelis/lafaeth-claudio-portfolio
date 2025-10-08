"use server";

import { eq } from "drizzle-orm";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import {
  cadastreImageSchema
} from "@/app/data/schemas/cadastre-image-schema";
import { UpdateImageDTO } from "@/app/data/schemas/update-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const updateImage = async (
  imageId: string,
  data: UpdateImageDTO
): Promise<ImageDTO> => {
  const dataValidated = cadastreImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [updatedImage] = await db
    .update(imagesTable)

    .set({
      ...dataValidated,
      ...(dataValidated.visibleInHome === false && { indexInHome: null }),
    })
    .where(eq(imagesTable.id, imageId))
    .returning();

  return mapToImageDTO({ image: updatedImage });
};
