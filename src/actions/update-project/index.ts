"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import isProjectSlugTaken from "@/app/data/project/is-project-slug-taken";
import { mapToProjectAdmin } from "@/app/data/project/map-to-project";
import { ProjectMutationResult } from "@/app/data/project/project-mutation-result";
import {
  UpdateProjectInput,
  updateProjectSchema,
} from "@/app/data/schemas/update-project-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateProject = async (
  data: UpdateProjectInput
): Promise<ProjectMutationResult> => {
  const dataValidated = updateProjectSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  if (await isProjectSlugTaken(dataValidated.slug, dataValidated.id)) {
    return { success: false, slugTaken: true };
  }

  const [project] = await db
    .update(projectTable)
    .set({
      title: dataValidated.title,
      slug: dataValidated.slug,
      projectType: dataValidated.projectType || null,
      startDate: dataValidated.startDate,
      endDate: dataValidated.endDate || null,
      description: dataValidated.description,
      visibleInProjects: dataValidated.visibleInProjects,
      ...(!dataValidated.visibleInProjects && { index: null }),
    })
    .where(eq(projectTable.id, dataValidated.id))
    .returning();

  if (!project) throw new Error("Project not found");

  updateTag(cacheTags.projects);

  return { success: true, project: mapToProjectAdmin(project) };
};
