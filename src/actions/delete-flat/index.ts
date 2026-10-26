"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { flatTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/** Removes the flat. Its image stays in the image library. */
export const deleteFlat = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [deleted] = await db
    .delete(flatTable)
    .where(eq(flatTable.id, idValidated))
    .returning({ id: flatTable.id });

  if (!deleted) throw new Error("Flat not found");

  updateTag(cacheTags.flats);

  return { success: true };
};
