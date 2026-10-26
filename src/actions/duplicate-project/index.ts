"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

import getAvailableProjectSlug from "@/app/data/project/get-available-project-slug";
import { mapToProjectAdmin } from "@/app/data/project/map-to-project";
import { ProjectAdminDTO } from "@/app/data/project/project-dto";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { projectImagesTable, projectTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

/**
 * Copies a project and its images as a draft (not published). The copied
 * images point to the same R2 files; deleteUnusedImageFiles only removes a
 * file when no row uses it, so deleting either project keeps the other intact.
 */
export const duplicateProject = async (
  id: string
): Promise<{ success: true; project: ProjectAdminDTO }> => {
  const idValidated = z.uuid("id invalido").parse(id);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const source = await db.query.projectTable.findFirst({
    where: eq(projectTable.id, idValidated),
    with: { images: true },
  });
  if (!source) throw new Error("Project not found");

  const slug = await getAvailableProjectSlug(source.slug);

  const project = await db.transaction(async (tx) => {
    const [copy] = await tx
      .insert(projectTable)
      .values({
        title: `${source.title} (cópia)`,
        slug,
        description: source.description,
        projectType: source.projectType,
        startDate: source.startDate,
        endDate: source.endDate,
        imageColumns: source.imageColumns,
        visibleInProjects: false,
        index: null,
      })
      .returning();

    if (source.images.length > 0) {
      await tx.insert(projectImagesTable).values(
        source.images.map((image) => ({
          projectId: copy.id,
          title: image.title,
          imageUrl: image.imageUrl,
          originalUrl: image.originalUrl,
          visibleInProject: image.visibleInProject,
          index: image.index,
        }))
      );
    }

    return copy;
  });

  updateTag(cacheTags.projects);

  return { success: true, project: mapToProjectAdmin(project) };
};
