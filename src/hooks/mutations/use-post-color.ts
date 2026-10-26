"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postColor } from "@/actions/post-color";
import { CadastreColorDTO } from "@/app/data/schemas/cadastre-color-schema";
import { colorsQueries } from "@/queries/colors";

export const getPostColorMutationKey = () => ["post-color"] as const;

export const usePostColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostColorMutationKey(),
    mutationFn: async (data: CadastreColorDTO) => await postColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsQueries.keys.all });
    },
  });
};
