"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postProjectImage } from "@/actions/post-project-image";
import { CadastreProjectImageInput } from "@/app/data/schemas/cadastre-project-image-schema";
import { projectsQueries } from "@/queries/projects";

export const getPostProjectImageMutationKey = () => ["post-project-image"] as const;

export const usePostProjectImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostProjectImageMutationKey(),
    mutationFn: async (data: CadastreProjectImageInput) => await postProjectImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
