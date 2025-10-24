"use client";

import { useMutation } from "@tanstack/react-query";

import { updateComic } from "@/actions/update-comic";
import { UpdateComicDTO } from "@/app/data/schemas/update-comic-schema";

export const getUpdateComicQueryKey = (comicId: string) =>
  ["update-comic", comicId] as const;

export const useUpdateComic = (comicId: string) => {
  return useMutation({
    mutationKey: getUpdateComicQueryKey(comicId),
    mutationFn: async (data: UpdateComicDTO) =>
      await updateComic(comicId, data),
  });
};
