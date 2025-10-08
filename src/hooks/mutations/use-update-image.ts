"use client";

import { useMutation } from "@tanstack/react-query";

import { updateImage } from "@/actions/update-image";
import { UpdateImageDTO } from "@/app/data/schemas/update-image-schema";

export const getUpdateImageQueryKey = (imageId: string) =>
  ["update-image", imageId] as const;

export const useUpdateImage = (imageId: string) => {
  return useMutation({
    mutationKey: getUpdateImageQueryKey(imageId),
    mutationFn: async (data: UpdateImageDTO) =>
      await updateImage(imageId, data),
  });
};
