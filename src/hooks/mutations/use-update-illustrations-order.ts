"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateIllustrationsOrder } from "@/actions/update-illustrations-order";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { illustrationsQueries } from "@/queries/illustrations";

export const getUpdateIllustrationsOrderMutationKey = () =>
  ["update-illustrations-order"] as const;

export const useUpdateIllustrationsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateIllustrationsOrderMutationKey(),
    mutationFn: async (illustrations: Array<IllustrationDTO>) =>
      await updateIllustrationsOrder(illustrations),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: illustrationsQueries.keys.all,
      });
    },
  });
};
