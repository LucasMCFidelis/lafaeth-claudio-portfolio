import { projectImagesTable, projectTable } from "@/db/schema";

import {
  ProjectAdminDTO,
  ProjectDTO,
  ProjectImageAdminDTO,
  ProjectImageDTO,
  ProjectSummaryDTO,
} from "./project-dto";

type ProjectImageRow = typeof projectImagesTable.$inferSelect;

export type ProjectRow = typeof projectTable.$inferSelect & {
  images: Array<ProjectImageRow>;
};

export const byIndex = (
  a: { index: number | null },
  b: { index: number | null }
) => (a.index ?? Infinity) - (b.index ?? Infinity);

const mapToProjectImage = (image: ProjectImageRow): ProjectImageDTO => ({
  id: image.id,
  title: image.title,
  imageUrl: image.imageUrl,
  originalUrl: image.originalUrl,
});

export const mapToProjectImageAdmin = (
  image: ProjectImageRow
): ProjectImageAdminDTO => ({
  ...mapToProjectImage(image),
  projectId: image.projectId,
  visibleInProject: image.visibleInProject,
  index: image.index,
});

const splitImages = (row: ProjectRow) => {
  const [cover = null, ...images] = row.images
    .filter((image) => image.visibleInProject)
    .sort(byIndex)
    .map(mapToProjectImage);
  return { cover, images };
};

export const mapToProjectAdmin = (
  row: typeof projectTable.$inferSelect
): ProjectAdminDTO => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
  projectType: row.projectType,
  imageColumns: row.imageColumns === 1 ? 1 : 2,
  startDate: row.startDate,
  endDate: row.endDate,
  visibleInProjects: row.visibleInProjects,
  index: row.index,
});

export const mapToProjectSummary = (row: ProjectRow): ProjectSummaryDTO => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  cover: splitImages(row).cover,
  visibleInProjects: row.visibleInProjects,
  index: row.index,
});

export const mapToProject = (row: ProjectRow): ProjectDTO => ({
  ...mapToProjectAdmin(row),
  ...splitImages(row),
});
