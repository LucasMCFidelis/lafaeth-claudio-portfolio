"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComic } from "@/actions/update-comic";
import { UpdateComicDTO } from "@/app/data/schemas/update-comic-schema";
import { comicsQueries } from "@/queries/comics";

export const getUpdateComicMutationKey = (comicId: string) =>
  ["update-comic", comicId] as const;

export const useUpdateComic = (comicId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateComicMutationKey(comicId),
    mutationFn: async (data: UpdateComicDTO) =>
      await updateComic(comicId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: comicsQueries.keys.all });
    },
  });
};
