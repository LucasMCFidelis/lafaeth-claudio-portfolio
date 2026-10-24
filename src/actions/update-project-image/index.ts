"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { mapToProjectImageAdmin } from "@/app/data/project/map-to-project";
import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import {
  UpdateProjectImageDTO,
  updateProjectImageSchema,
} from "@/app/data/schemas/update-project-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateProjectImage = async (
  data: UpdateProjectImageDTO
): Promise<ProjectImageAdminDTO> => {
  const dataValidated = updateProjectImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [image] = await db
    .update(projectImagesTable)
    .set({ title: dataValidated.title })
    .where(eq(projectImagesTable.id, dataValidated.id))
    .returning();

  if (!image) throw new Error("Project image not found");

  updateTag(cacheTags.projects);

  return mapToProjectImageAdmin(image);
};
