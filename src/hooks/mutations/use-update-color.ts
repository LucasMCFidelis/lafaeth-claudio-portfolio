"use client";

import { useMutation } from "@tanstack/react-query";

import { updateColor } from "@/actions/update-color";
import { UpdateColorDTO } from "@/app/data/schemas/update-color-schema";

export const getUpdateColorQueryKey = (colorId: string) =>
  ["update-color", colorId] as const;

export const useUpdateColor = (colorId: string) => {
  return useMutation({
    mutationKey: getUpdateColorQueryKey(colorId),
    mutationFn: async (data: UpdateColorDTO) =>
      await updateColor(colorId, data),
  });
};
