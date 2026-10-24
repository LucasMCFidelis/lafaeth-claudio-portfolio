"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProjectImage } from "@/actions/delete-project-image";
import { projectsQueries } from "@/queries/projects";

export const getDeleteProjectImageMutationKey = () => ["delete-project-image"] as const;

export const useDeleteProjectImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteProjectImageMutationKey(),
    mutationFn: async (id: string) => await deleteProjectImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
