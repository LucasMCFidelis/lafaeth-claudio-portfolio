"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProjectsOrder } from "@/actions/update-projects-order";
import { projectsQueries } from "@/queries/projects";

export const getUpdateProjectsOrderMutationKey = () =>
  ["update-projects-order"] as const;

export const useUpdateProjectsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateProjectsOrderMutationKey(),
    mutationFn: async (projects: Array<{ id: string; index: number | null }>) =>
      await updateProjectsOrder(projects),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
