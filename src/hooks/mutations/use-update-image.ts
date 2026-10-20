"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateImage } from "@/actions/update-image";
import { UpdateImageDTO } from "@/app/data/schemas/update-image-schema";
import { imageDependentQueryKeys } from "@/queries/images";

export const getUpdateImageMutationKey = (imageId: string) =>
  ["update-image", imageId] as const;

export const useUpdateImage = (imageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateImageMutationKey(imageId),
    mutationFn: async (data: UpdateImageDTO) =>
      await updateImage(imageId, data),
    onSuccess: () => {
      // Lists embed image data, so all of them may be outdated.
      for (const queryKey of imageDependentQueryKeys) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
