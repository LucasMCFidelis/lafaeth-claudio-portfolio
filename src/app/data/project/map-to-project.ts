import { projectImagesTable, projectTable } from "@/db/schema";

import { ProjectDTO, ProjectImageDTO, ProjectSummaryDTO } from "./project-dto";

export type ProjectRow = typeof projectTable.$inferSelect & {
  images: Array<typeof projectImagesTable.$inferSelect>;
};

const byIndex = (a: { index: number | null }, b: { index: number | null }) =>
  (a.index ?? Infinity) - (b.index ?? Infinity);

const mapToProjectImage = (
  image: typeof projectImagesTable.$inferSelect
): ProjectImageDTO => ({
  id: image.id,
  title: image.title,
  imageUrl: image.imageUrl,
});

const splitImages = (row: ProjectRow) => {
  const [cover = null, ...images] = row.images
    .filter((image) => image.visibleInProject)
    .sort(byIndex)
    .map(mapToProjectImage);
  return { cover, images };
};

export const sortProjects = (rows: ProjectRow[]) => [...rows].sort(byIndex);

export const mapToProjectSummary = (row: ProjectRow): ProjectSummaryDTO => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  cover: splitImages(row).cover,
});

export const mapToProject = (row: ProjectRow): ProjectDTO => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
  projectType: row.projectType,
  startDate: row.startDate,
  endDate: row.endDate,
  ...splitImages(row),
});
