"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComicsOrder } from "@/actions/update-comics-order";
import { ComicDTO } from "@/app/data/comics/comic-dto";
import { comicsQueries } from "@/queries/comics";

export const getUpdateComicsOrderMutationKey = () =>
  ["update-comics-order"] as const;

export const useUpdateComicsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateComicsOrderMutationKey(),
    mutationFn: async (comics: Array<ComicDTO>) =>
      await updateComicsOrder(comics),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: comicsQueries.keys.all });
    },
  });
};
