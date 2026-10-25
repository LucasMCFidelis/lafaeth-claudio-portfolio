"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { after } from "next/server";
import z from "zod";

import deleteUnusedImageFiles from "@/app/data/image/delete-unused-image-files";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable, projectTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const deleteProject = async (id: string) => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  // The project images are deleted with it (on delete cascade), so read
  // their URLs first to remove the files.
  const images = await db
    .select({ imageUrl: projectImagesTable.imageUrl })
    .from(projectImagesTable)
    .where(eq(projectImagesTable.projectId, idValidated));

  const [deleted] = await db
    .delete(projectTable)
    .where(eq(projectTable.id, idValidated))
    .returning({ id: projectTable.id });

  if (!deleted) throw new Error("Project not found");

  updateTag(cacheTags.projects);
  after(() => deleteUnusedImageFiles(images.map((image) => image.imageUrl)));

  return { success: true };
};
