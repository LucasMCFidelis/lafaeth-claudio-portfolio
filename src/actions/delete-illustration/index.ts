"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/** Removes the illustration. Its image stays in the image library. */
export const deleteIllustration = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [deleted] = await db
    .delete(illustrationsTable)
    .where(eq(illustrationsTable.id, idValidated))
    .returning({ id: illustrationsTable.id });

  if (!deleted) throw new Error("Illustration not found");

  updateTag(cacheTags.illustrations);

  return { success: true };
};
