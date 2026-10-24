"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProjectImage } from "@/actions/update-project-image";
import { UpdateProjectImageDTO } from "@/app/data/schemas/update-project-image-schema";
import { projectsQueries } from "@/queries/projects";

export const getUpdateProjectImageMutationKey = () => ["update-project-image"] as const;

export const useUpdateProjectImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateProjectImageMutationKey(),
    mutationFn: async (data: UpdateProjectImageDTO) => await updateProjectImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
