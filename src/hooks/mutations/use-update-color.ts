"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateColor } from "@/actions/update-color";
import { UpdateColorDTO } from "@/app/data/schemas/update-color-schema";
import { colorsQueries } from "@/queries/colors";

export const getUpdateColorMutationKey = (colorId: string) =>
  ["update-color", colorId] as const;

export const useUpdateColor = (colorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateColorMutationKey(colorId),
    mutationFn: async (data: UpdateColorDTO) =>
      await updateColor(colorId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorsQueries.keys.all });
    },
  });
};
