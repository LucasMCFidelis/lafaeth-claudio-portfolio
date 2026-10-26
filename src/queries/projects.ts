import { queryOptions } from "@tanstack/react-query";

import { getProject } from "@/actions/get-project";
import { getProjectImages } from "@/actions/get-project-images";
import { getProjects } from "@/actions/get-projects";
import { getVisibleProjects } from "@/actions/get-visible-projects";
import type { GetManyProjectsProps } from "@/app/data/project/get-many-projects";

import { cacheTags } from "./tags";

export type ProjectsFilters = Pick<GetManyProjectsProps, "where" | "orderBy">;

export const projectsQueries = {
  tag: cacheTags.projects,
  keys: {
    all: ["projects"] as const,
    visible: () => ["projects", "visible"] as const,
    list: (filters: ProjectsFilters = {}) =>
      ["projects", "list", filters] as const,
    detail: (id: string) => ["projects", "detail", id] as const,
    images: (projectId: string) => ["projects", "images", projectId] as const,
  },
  visible: () =>
    queryOptions({
      queryKey: projectsQueries.keys.visible(),
      queryFn: () => getVisibleProjects(),
      staleTime: Infinity,
    }),
  list: (filters: ProjectsFilters = {}) =>
    queryOptions({
      queryKey: projectsQueries.keys.list(filters),
      queryFn: () => getProjects(filters),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: projectsQueries.keys.detail(id),
      queryFn: () => getProject({ projectId: id }),
    }),
  images: (projectId: string) =>
    queryOptions({
      queryKey: projectsQueries.keys.images(projectId),
      queryFn: () => getProjectImages({ projectId }),
    }),
};
