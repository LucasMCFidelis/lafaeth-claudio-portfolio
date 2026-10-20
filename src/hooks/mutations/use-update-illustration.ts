"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateIllustration } from "@/actions/update-illustration";
import { UpdateIllustrationDTO } from "@/app/data/schemas/update-illustration-schema";
import { illustrationsQueries } from "@/queries/illustrations";

export const getUpdateIllustrationMutationKey = (illustrationId: string) =>
  ["update-illustration", illustrationId] as const;

export const useUpdateIllustration = (illustrationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateIllustrationMutationKey(illustrationId),
    mutationFn: async (data: UpdateIllustrationDTO) =>
      await updateIllustration(illustrationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: illustrationsQueries.keys.all,
      });
    },
  });
};
