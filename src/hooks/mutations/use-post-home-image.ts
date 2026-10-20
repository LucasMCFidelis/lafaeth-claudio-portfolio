"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postImage } from "@/actions/post-image";
import { CadastreImageDTO } from "@/app/data/schemas/cadastre-image-schema";
import { imagesQueries } from "@/queries/images";

export const getPostHomeImageMutationKey = () => ["post-home-image"] as const;

export const usePostHomeImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostHomeImageMutationKey(),
    mutationFn: async (data: CadastreImageDTO) => await postImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imagesQueries.keys.all });
    },
  });
};
