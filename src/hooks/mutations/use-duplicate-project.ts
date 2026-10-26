"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { duplicateProject } from "@/actions/duplicate-project";
import { projectsQueries } from "@/queries/projects";

export const getDuplicateProjectMutationKey = () =>
  ["duplicate-project"] as const;

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDuplicateProjectMutationKey(),
    mutationFn: async (id: string) => await duplicateProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
