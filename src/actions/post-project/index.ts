"use server";

import { updateTag } from "next/cache";

import isProjectSlugTaken from "@/app/data/project/is-project-slug-taken";
import { mapToProjectAdmin } from "@/app/data/project/map-to-project";
import { ProjectMutationResult } from "@/app/data/project/project-mutation-result";
import {
  CadastreProjectInput,
  cadastreProjectSchema,
} from "@/app/data/schemas/cadastre-project-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const postProject = async (
  data: CadastreProjectInput
): Promise<ProjectMutationResult> => {
  const dataValidated = cadastreProjectSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  if (await isProjectSlugTaken(dataValidated.slug)) {
    return { success: false, slugTaken: true };
  }

  const [project] = await db
    .insert(projectTable)
    .values({
      title: dataValidated.title,
      slug: dataValidated.slug,
      projectType: dataValidated.projectType || null,
      startDate: dataValidated.startDate,
      endDate: dataValidated.endDate || null,
      description: dataValidated.description,
      visibleInProjects: dataValidated.visibleInProjects,
    })
    .returning();

  updateTag(cacheTags.projects);

  return { success: true, project: mapToProjectAdmin(project) };
};
