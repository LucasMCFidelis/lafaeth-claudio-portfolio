"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postComic } from "@/actions/post-comic";
import { CadastreComicDTO } from "@/app/data/schemas/cadastre-comic-schema";
import { comicsQueries } from "@/queries/comics";

export const getPostComicMutationKey = () => ["post-comic"] as const;

export const usePostComic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostComicMutationKey(),
    mutationFn: async (data: CadastreComicDTO) => await postComic(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: comicsQueries.keys.all });
    },
  });
};
