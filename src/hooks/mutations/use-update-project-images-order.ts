"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProjectImagesOrder } from "@/actions/update-project-images-order";
import { projectsQueries } from "@/queries/projects";

export const getUpdateProjectImagesOrderMutationKey = () => ["update-project-images-order"] as const;

export const useUpdateProjectImagesOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateProjectImagesOrderMutationKey(),
    mutationFn: async (images: Array<{ id: string; index: number | null }>) => await updateProjectImagesOrder(images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
