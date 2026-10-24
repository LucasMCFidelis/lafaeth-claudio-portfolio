"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "@/actions/update-project";
import { UpdateProjectInput } from "@/app/data/schemas/update-project-schema";
import { projectsQueries } from "@/queries/projects";

export const getUpdateProjectMutationKey = (projectId: string) =>
  ["update-project", projectId] as const;

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateProjectMutationKey(projectId),
    mutationFn: async (data: UpdateProjectInput) => await updateProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
