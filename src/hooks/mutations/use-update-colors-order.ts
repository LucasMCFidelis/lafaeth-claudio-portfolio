"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateColorsOrder } from "@/actions/update-colors-order";
import { ColorDTO } from "@/app/data/colorization/colors-dto";

import { getColorsVisibleQueryKey } from "../queries/use-colors-visible";

export const getUpdateColorsOrderQueryKey = () =>
  ["update-comics-order"] as const;

export const useUpdateColorsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateColorsOrderQueryKey(),
    mutationFn: async (colors: Array<ColorDTO>) =>
      await updateColorsOrder(colors),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getColorsVisibleQueryKey() }),
  });
};
