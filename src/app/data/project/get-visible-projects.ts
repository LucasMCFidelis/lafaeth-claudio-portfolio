import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import getVisibleProjectRows from "./get-visible-project-rows";
import { mapToProjectSummary } from "./map-to-project";
import { ProjectSummaryDTO } from "./project-dto";

const getVisibleProjectsCached = async (): Promise<ProjectSummaryDTO[]> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.projects);

  const rows = await getVisibleProjectRows();
  return rows.map(mapToProjectSummary);
};

export default getVisibleProjectsCached;
