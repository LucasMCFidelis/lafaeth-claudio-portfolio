"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postProject } from "@/actions/post-project";
import { CadastreProjectInput } from "@/app/data/schemas/cadastre-project-schema";
import { projectsQueries } from "@/queries/projects";

export const getPostProjectMutationKey = () => ["post-project"] as const;

export const usePostProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostProjectMutationKey(),
    mutationFn: async (data: CadastreProjectInput) => await postProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueries.keys.all });
    },
  });
};
