"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getOneFlat from "@/app/data/flat/get-one-flat";
import mapToFlatDTO from "@/app/data/flat/map-to-flat-dto";
import {
  UpdateFlatDTO,
  updateFlatSchema,
} from "@/app/data/schemas/update-flat-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { flatTable } from "@/db/schema";

export const updateFlat = async (
  flatId: string,
  data: UpdateFlatDTO
): Promise<FlatDTO> => {
  const dataValidated = updateFlatSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  getOneFlat({ where: { field: "id", value: flatId }, withImages: true });

  const [flatUpdated] = await db
    .update(flatTable)
    .set({
      title: dataValidated.title,
      description: dataValidated.description,
      backImageId: dataValidated.backImageId,
      frontImageId: dataValidated.frontImageId,
      visibleInFlat: dataValidated.visibleInFlat,
    })
    .where(eq(flatTable.id, flatId))
    .returning();

  revalidatePath(`/admin/flat/update`);

  return mapToFlatDTO({ data: flatUpdated, withImages: true });
};
