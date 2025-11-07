"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateIllustrationsOrder } from "@/actions/update-illustrations-order";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";

import { getIllustrationsVisibleQueryKey } from "../queries/use-illustrations-visible";

export const getUpdateIllustrationsOrderQueryKey = () =>
  ["update-illustrations-order"] as const;

export const useUpdateIllustrationsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateIllustrationsOrderQueryKey(),
    mutationFn: async (illustrations: Array<IllustrationDTO>) =>
      await updateIllustrationsOrder(illustrations),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: getIllustrationsVisibleQueryKey(),
      }),
  });
};
