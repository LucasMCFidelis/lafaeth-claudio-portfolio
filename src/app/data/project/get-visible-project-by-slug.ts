import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import getVisibleProjectRows from "./get-visible-project-rows";
import { mapToProject } from "./map-to-project";
import { ProjectLinkDTO, ProjectPageDTO } from "./project-dto";

const getVisibleProjectBySlugCached = async (
  slug: string
): Promise<ProjectPageDTO | null> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.projects);

  const rows = await getVisibleProjectRows();
  const position = rows.findIndex((row) => row.slug === slug);
  if (position === -1) return null;

  const toLink = (index: number): ProjectLinkDTO | null => {
    const row = rows[index];
    return row ? { slug: row.slug, title: row.title } : null;
  };

  return {
    project: mapToProject(rows[position]),
    prev: toLink(position - 1),
    next: toLink(position + 1),
  };
};

export default getVisibleProjectBySlugCached;
