"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { projectsQueries } from "@/queries/projects";

export const useVisibleProjects = () =>
  useSuspenseQuery(projectsQueries.visible());
