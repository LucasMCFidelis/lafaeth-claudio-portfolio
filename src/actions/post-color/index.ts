"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getOneColor from "@/app/data/colorization/get-one-color";
import mapToColorDTO from "@/app/data/colorization/map-to-color";
import {
  CadastreColorDTO,
  cadastreColorSchema,
} from "@/app/data/schemas/cadastre-color-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { colorizationTable } from "@/db/schema";

export const postColor = async (data: CadastreColorDTO): Promise<ColorDTO> => {
  const dataValidated = cadastreColorSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  let color;
  try {
    color = await getOneColor({
      where: { field: "imageId", value: dataValidated.imageId },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Color not found") {
      color = null;
    } else {
      console.error("Unexpected error fetching colorization:", error);
      throw error;
    }
  }
  if (color) {
    throw new Error(
      "Duplicate imageId: a colorization with this image already exists"
    );
  }

  const [newColor] = await db
    .insert(colorizationTable)
    .values(dataValidated)
    .returning();

  return mapToColorDTO({ data: newColor, withImage: true });
};
