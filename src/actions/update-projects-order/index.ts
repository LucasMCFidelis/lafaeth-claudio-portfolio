"use server";

import { updateTag } from "next/cache";
import z from "zod";

import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { projectTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

const orderSchema = z.array(
  z.object({ id: z.uuid("id invalido"), index: z.number().nullable() })
);

export const updateProjectsOrder = async (
  projects: Array<{ id: string; index: number | null }>
) => {
  const items = orderSchema.parse(projects);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({ items, table: projectTable });

  updateTag(cacheTags.projects);

  return { success: true };
};
