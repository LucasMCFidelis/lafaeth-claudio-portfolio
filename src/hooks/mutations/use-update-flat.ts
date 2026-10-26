"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFlat } from "@/actions/update-flat";
import { UpdateFlatDTO } from "@/app/data/schemas/update-flat-schema";
import { flatsQueries } from "@/queries/flats";

export const getUpdateFlatMutationKey = (flatId: string) =>
  ["update-flat", flatId] as const;

export const useUpdateFlat = (flatId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateFlatMutationKey(flatId),
    mutationFn: async (data: UpdateFlatDTO) => await updateFlat(flatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: flatsQueries.keys.all });
    },
  });
};
