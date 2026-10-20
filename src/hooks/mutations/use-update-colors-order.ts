"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateColorsOrder } from "@/actions/update-colors-order";
import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { colorsQueries } from "@/queries/colors";

export const getUpdateColorsOrderMutationKey = () =>
  ["update-colors-order"] as const;

export const useUpdateColorsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateColorsOrderMutationKey(),
    mutationFn: async (colors: Array<ColorDTO>) =>
      await updateColorsOrder(colors),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsQueries.keys.all });
    },
  });
};
