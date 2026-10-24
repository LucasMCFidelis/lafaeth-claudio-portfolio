"use server";

import { eq, max } from "drizzle-orm";
import { updateTag } from "next/cache";

import { mapToProjectImageAdmin } from "@/app/data/project/map-to-project";
import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import {
  CadastreProjectImageInput,
  cadastreProjectImageSchema,
} from "@/app/data/schemas/cadastre-project-image-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const postProjectImage = async (
  data: CadastreProjectImageInput
): Promise<ProjectImageAdminDTO> => {
  const dataValidated = cadastreProjectImageSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [{ lastIndex }] = await db
    .select({ lastIndex: max(projectImagesTable.index) })
    .from(projectImagesTable)
    .where(eq(projectImagesTable.projectId, dataValidated.projectId));

  const [image] = await db
    .insert(projectImagesTable)
    .values({
      projectId: dataValidated.projectId,
      title: dataValidated.title,
      imageUrl: dataValidated.imageUrl,
      index: lastIndex === null ? 0 : lastIndex + 1,
    })
    .returning();

  updateTag(cacheTags.projects);

  return mapToProjectImageAdmin(image);
};
