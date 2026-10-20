"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import mapToColorDTO from "@/app/data/colorization/map-to-color";
import {
  UpdateColorDTO,
  updateColorSchema,
} from "@/app/data/schemas/update-color-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { colorizationTable } from "@/db/schema";

export const updateColor = async (
  colorId: string,
  data: UpdateColorDTO
): Promise<ColorDTO> => {
  const dataValidated = updateColorSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [colorUpdated] = await db
    .update(colorizationTable)
    .set({
      imageId: dataValidated.imageId,
      productionYear: dataValidated.productionYear,
      visibleInColorization: dataValidated.visibleInColorization,
      observations: dataValidated.observations,
    })
    .where(eq(colorizationTable.id, colorId))
    .returning();

  if (!colorUpdated) throw new Error("Color not found");

  revalidatePath(`/admin/cores/update`);

  return mapToColorDTO({ data: colorUpdated, withImage: true });
};
