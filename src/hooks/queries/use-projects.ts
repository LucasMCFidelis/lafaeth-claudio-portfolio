"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ProjectsFilters, projectsQueries } from "@/queries/projects";

export const useVisibleProjects = () =>
  useSuspenseQuery(projectsQueries.visible());

export const useProjectsList = (filters?: ProjectsFilters) =>
  useSuspenseQuery(projectsQueries.list(filters));

export const useProject = (projectId: string) =>
  useSuspenseQuery(projectsQueries.detail(projectId));

export const useProjectImages = (projectId: string) =>
  useSuspenseQuery(projectsQueries.images(projectId));
