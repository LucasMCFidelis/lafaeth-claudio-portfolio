"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProjectImage } from "@/actions/update-project-image";
import { UpdateProjectImageInput } from "@/app/data/schemas/update-project-image-schema";
import { projectsQueries } from "@/queries/projects";

export const getUpdateProjectImageMutationKey = () => ["update-project-image"] as const;

export const useUpdateProjectImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateProjectImageMutationKey(),
    mutationFn: async (data: UpdateProjectImageInput) => await updateProjectImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
