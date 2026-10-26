"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { after } from "next/server";
import z from "zod";

import deleteUnusedImageFiles from "@/app/data/image/delete-unused-image-files";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const deleteProjectImage = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [deleted] = await db
    .delete(projectImagesTable)
    .where(eq(projectImagesTable.id, idValidated))
    .returning({
      id: projectImagesTable.id,
      imageUrl: projectImagesTable.imageUrl,
      originalUrl: projectImagesTable.originalUrl,
    });

  if (!deleted) throw new Error("Project image not found");

  updateTag(cacheTags.projects);
  after(() => deleteUnusedImageFiles([deleted.imageUrl, deleted.originalUrl]));

  return { success: true };
};
