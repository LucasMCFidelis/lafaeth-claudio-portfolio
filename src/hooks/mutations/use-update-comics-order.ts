"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComicsOrder } from "@/actions/update-comics-order";
import { ComicDTO } from "@/app/data/comics/comic-dto";

import { getComicsVisibleQueryKey } from "../queries/use-comics-visible";

export const getUpdateComicsOrderQueryKey = () =>
  ["update-comics-order"] as const;

export const useUpdateComicsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateComicsOrderQueryKey(),
    mutationFn: async (comics: Array<ComicDTO>) =>
      await updateComicsOrder(comics),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getComicsVisibleQueryKey() }),
  });
};
