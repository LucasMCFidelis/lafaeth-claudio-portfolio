"use server";

import { updateTag } from "next/cache";
import z from "zod";

import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { projectImagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

const orderSchema = z.array(
  z.object({ id: z.uuid("id invalido"), index: z.number().nullable() })
);

export const updateProjectImagesOrder = async (
  images: Array<{ id: string; index: number | null }>
) => {
  const items = orderSchema.parse(images);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({ items, table: projectImagesTable });

  updateTag(cacheTags.projects);

  return { success: true };
};
