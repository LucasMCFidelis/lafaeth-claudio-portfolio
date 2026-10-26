"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteColor } from "@/actions/delete-color";
import { colorsQueries } from "@/queries/colors";
import { isDetailOf } from "@/queries/is-detail-of";

export const getDeleteColorMutationKey = () => ["delete-color"] as const;

export const useDeleteColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteColorMutationKey(),
    mutationFn: async (id: string) => await deleteColor(id),
    onSuccess: (_data, id) => {
      // Refresh the lists, but not the open detail of the deleted item: it
      // would fail to refetch while the page navigates away.
      queryClient.invalidateQueries({
        queryKey: colorsQueries.keys.all,
        predicate: (query) => !isDetailOf(query.queryKey, id),
      });
    },
  });
};
