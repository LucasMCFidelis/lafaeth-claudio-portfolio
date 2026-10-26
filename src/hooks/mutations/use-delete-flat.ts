"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFlat } from "@/actions/delete-flat";
import { flatsQueries } from "@/queries/flats";
import { isDetailOf } from "@/queries/is-detail-of";

export const getDeleteFlatMutationKey = () => ["delete-flat"] as const;

export const useDeleteFlat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteFlatMutationKey(),
    mutationFn: async (id: string) => await deleteFlat(id),
    onSuccess: (_data, id) => {
      // Refresh the lists, but not the open detail of the deleted item: it
      // would fail to refetch while the page navigates away.
      queryClient.invalidateQueries({
        queryKey: flatsQueries.keys.all,
        predicate: (query) => !isDetailOf(query.queryKey, id),
      });
    },
  });
};
