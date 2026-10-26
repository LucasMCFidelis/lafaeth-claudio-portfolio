"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteIllustration } from "@/actions/delete-illustration";
import { illustrationsQueries } from "@/queries/illustrations";
import { isDetailOf } from "@/queries/is-detail-of";

export const getDeleteIllustrationMutationKey = () =>
  ["delete-illustration"] as const;

export const useDeleteIllustration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteIllustrationMutationKey(),
    mutationFn: async (id: string) => await deleteIllustration(id),
    onSuccess: (_data, id) => {
      // Refresh the lists, but not the open detail of the deleted item: it
      // would fail to refetch while the page navigates away.
      queryClient.invalidateQueries({
        queryKey: illustrationsQueries.keys.all,
        predicate: (query) => !isDetailOf(query.queryKey, id),
      });
    },
  });
};
