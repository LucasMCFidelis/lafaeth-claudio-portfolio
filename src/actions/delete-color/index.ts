"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { colorizationTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/** Removes the color. Its image stays in the image library. */
export const deleteColor = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [deleted] = await db
    .delete(colorizationTable)
    .where(eq(colorizationTable.id, idValidated))
    .returning({ id: colorizationTable.id });

  if (!deleted) throw new Error("Color not found");

  updateTag(cacheTags.colors);

  return { success: true };
};
