import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projectImagesTable } from "@/db/schema";

import { byIndex, mapToProjectImageAdmin } from "./map-to-project";
import { ProjectImageAdminDTO } from "./project-dto";

const getProjectImages = async ({
  projectId,
}: {
  projectId: string;
}): Promise<ProjectImageAdminDTO[]> => {
  const images = await db.query.projectImagesTable.findMany({
    where: eq(projectImagesTable.projectId, projectId),
  });

  return images.sort(byIndex).map(mapToProjectImageAdmin);
};

export default getProjectImages;
