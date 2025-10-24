"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import mapToFlatDTO from "@/app/data/flat/map-to-flat-dto";
import getOneImageById from "@/app/data/image/get-one-image-by-id";
import {
  CadastreFlatDTO,
  cadastreFlatSchema,
} from "@/app/data/schemas/cadastre-flat-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { flatTable } from "@/db/schema";

export const postFlat = async (data: CadastreFlatDTO): Promise<FlatDTO> => {
  const dataValidated = cadastreFlatSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [frontImage, backImage] = await Promise.all([
    getOneImageById({ imageId: dataValidated.frontImageId }),
    getOneImageById({ imageId: dataValidated.backImageId }),
  ]);

  if (frontImage.horizontalPage != backImage.horizontalPage) {
    throw new Error("Conflict in orientations pages")
  }

  const [newFlat] = await db
    .insert(flatTable)
    .values(dataValidated)
    .returning();

  return mapToFlatDTO({ data: newFlat, withImages: false });
};
