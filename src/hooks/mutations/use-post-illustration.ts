"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postIllustration } from "@/actions/post-illustration";
import { CadastreIllustrationDTO } from "@/app/data/schemas/cadastre-illustration-schema";
import { illustrationsQueries } from "@/queries/illustrations";

export const getPostIllustrationMutationKey = () =>
  ["post-illustration"] as const;

export const usePostIllustration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getPostIllustrationMutationKey(),
    mutationFn: async (data: CadastreIllustrationDTO) =>
      await postIllustration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: illustrationsQueries.keys.all,
      });
    },
  });
};
