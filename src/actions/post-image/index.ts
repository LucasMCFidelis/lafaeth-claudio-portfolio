"use server";

import { updateTag } from "next/cache";

import { ImageDTO } from "@/app/data/image/image-dto";
import { mapToImageDTO } from "@/app/data/image/map-to-image-dto";
import {
  CadastreImageDTO,
  cadastreImageSchema,
} from "@/app/data/schemas/cadastre-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

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
      originalUrl: dataValidated.originalUrl ?? null,
      visibleInHome: dataValidated.visibleInHome,
      artist: dataValidated.artist,
      screenwriter: dataValidated.screenwriter,
      colorist: dataValidated.colorist,
      horizontalPage: dataValidated.horizontalPage
    })
    .returning();

  updateTag(cacheTags.images);

  return mapToImageDTO({ image: imageCreated });
};
