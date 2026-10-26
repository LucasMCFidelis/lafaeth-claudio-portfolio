"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "@/actions/delete-project";
import { isDetailOf } from "@/queries/is-detail-of";
import { projectsQueries } from "@/queries/projects";

export const getDeleteProjectMutationKey = () => ["delete-project"] as const;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteProjectMutationKey(),
    mutationFn: async (id: string) => await deleteProject(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({
        queryKey: projectsQueries.keys.all,
        predicate: (query) =>
          !isDetailOf(query.queryKey, id) &&
          !(query.queryKey[1] === "images" && query.queryKey[2] === id),
      });
    },
  });
};
