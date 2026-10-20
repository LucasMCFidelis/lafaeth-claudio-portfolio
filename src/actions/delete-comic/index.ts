"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { comicsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/** Removes the comic. Its image stays in the image library. */
export const deleteComic = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [deleted] = await db
    .delete(comicsTable)
    .where(eq(comicsTable.id, idValidated))
    .returning({ id: comicsTable.id });

  if (!deleted) throw new Error("Comic not found");

  updateTag(cacheTags.comics);

  return { success: true };
};
