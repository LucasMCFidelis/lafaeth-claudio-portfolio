import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projectTable } from "@/db/schema";

import { mapToProjectAdmin } from "./map-to-project";
import { ProjectAdminDTO } from "./project-dto";

const getOneProjectById = async ({
  projectId,
}: {
  projectId: string;
}): Promise<ProjectAdminDTO> => {
  const project = await db.query.projectTable.findFirst({
    where: eq(projectTable.id, projectId),
  });

  if (!project) throw new Error("Project not found");

  return mapToProjectAdmin(project);
};

export default getOneProjectById;
