"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComic } from "@/actions/delete-comic";
import { comicsQueries } from "@/queries/comics";
import { isDetailOf } from "@/queries/is-detail-of";

export const getDeleteComicMutationKey = () => ["delete-comic"] as const;

export const useDeleteComic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteComicMutationKey(),
    mutationFn: async (id: string) => await deleteComic(id),
    onSuccess: (_data, id) => {
      // Refresh the lists, but not the open detail of the deleted item: it
      // would fail to refetch while the page navigates away.
      queryClient.invalidateQueries({
        queryKey: comicsQueries.keys.all,
        predicate: (query) => !isDetailOf(query.queryKey, id),
      });
    },
  });
};
