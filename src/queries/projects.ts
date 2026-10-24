import { queryOptions } from "@tanstack/react-query";

import { getVisibleProjects } from "@/actions/get-visible-projects";

import { cacheTags } from "./tags";

export const projectsQueries = {
  tag: cacheTags.projects,
  keys: {
    all: ["projects"] as const,
    visible: () => ["projects", "visible"] as const,
  },
  visible: () =>
    queryOptions({
      queryKey: projectsQueries.keys.visible(),
      queryFn: () => getVisibleProjects(),
      staleTime: Infinity,
    }),
};
