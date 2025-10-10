"use client";

import { useMutation } from "@tanstack/react-query";

import { updateFlat } from "@/actions/update-flat";
import { UpdateFlatDTO } from "@/app/data/schemas/update-flat-schema";

export const getUpdateFlatQueryKey = (flatId: string) =>
  ["update-flat", flatId] as const;

export const useUpdateFlat = (flatId: string) => {
  return useMutation({
    mutationKey: getUpdateFlatQueryKey(flatId),
    mutationFn: async (data: UpdateFlatDTO) => await updateFlat(flatId, data),
  });
};
