"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { after } from "next/server";

import deleteUnusedImageFiles from "@/app/data/image/delete-unused-image-files";
import { mapToProjectImageAdmin } from "@/app/data/project/map-to-project";
import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import {
  UpdateProjectImageInput,
  updateProjectImageSchema,
} from "@/app/data/schemas/update-project-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateProjectImage = async (
  data: UpdateProjectImageInput
): Promise<ProjectImageAdminDTO> => {
  const dataValidated = updateProjectImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [current] = await db
    .select({ imageUrl: projectImagesTable.imageUrl })
    .from(projectImagesTable)
    .where(eq(projectImagesTable.id, dataValidated.id));

  const [image] = await db
    .update(projectImagesTable)
    .set({
      title: dataValidated.title,
      ...(dataValidated.imageUrl && { imageUrl: dataValidated.imageUrl }),
    })
    .where(eq(projectImagesTable.id, dataValidated.id))
    .returning();

  if (!image) throw new Error("Project image not found");

  updateTag(cacheTags.projects);
  if (current && current.imageUrl !== image.imageUrl) {
    after(() => deleteUnusedImageFiles([current.imageUrl]));
  }

  return mapToProjectImageAdmin(image);
};
