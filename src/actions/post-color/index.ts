"use server";

import { eq } from "drizzle-orm";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
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

  const existingColor = await db.query.colorizationTable.findFirst({
    columns: { id: true },
    where: eq(colorizationTable.imageId, dataValidated.imageId),
  });
  if (existingColor) {
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
