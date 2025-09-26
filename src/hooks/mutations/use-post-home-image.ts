"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postImage } from "@/actions/post-image";
import { CadastreImageDTO } from "@/app/data/schemas/cadastre-image-schema";

import { getHomeImagesQueryKey } from "../queries/use-home-images";

export const getPostHomeImageQueryKey = () => ["post-home-image"] as const;

export const usePostHomeImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostHomeImageQueryKey(),
    mutationFn: async (data: CadastreImageDTO) => await postImage(data),
    onSuccess: (imageCreated) =>
      imageCreated.visibleInHome &&
      queryClient.invalidateQueries({ queryKey: getHomeImagesQueryKey() }),
  });
};
