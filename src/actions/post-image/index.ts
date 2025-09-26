"use server";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import {
  CadastreImageDTO,
  cadastreImageSchema,
} from "@/app/data/schemas/cadastre-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const postImage = async (data: CadastreImageDTO): Promise<ImageDTO> => {
  const dataValidated = cadastreImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [imageCreated] = await db
    .insert(imagesTable)
    .values({
      title: dataValidated.title,
      description: dataValidated.description,
      imageUrl: dataValidated.imageUrl,
      visibleInHome: dataValidated.visibleInHome,
    })
    .returning();

  return mapToImageDTO({ image: imageCreated });
};
