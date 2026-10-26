"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postFlat } from "@/actions/post-flat";
import { CadastreFlatDTO } from "@/app/data/schemas/cadastre-flat-schema";
import { flatsQueries } from "@/queries/flats";

export const getPostFlatMutationKey = () => ["post-flat"] as const;

export const usePostFlat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostFlatMutationKey(),
    mutationFn: async (data: CadastreFlatDTO) => await postFlat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flatsQueries.keys.all });
    },
  });
};
