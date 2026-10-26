import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projectTable } from "@/db/schema";

import { mapToProject } from "./map-to-project";
import { ProjectDTO } from "./project-dto";

/**
 * Any project (published or draft) as the public page shows it. No cache:
 * only for the admin preview, behind AdminOnly.
 */
const getProjectPreview = async (
  projectId: string
): Promise<ProjectDTO | null> => {
  const row = await db.query.projectTable.findFirst({
    where: eq(projectTable.id, projectId),
    with: { images: true },
  });

  return row ? mapToProject(row) : null;
};

export default getProjectPreview;
