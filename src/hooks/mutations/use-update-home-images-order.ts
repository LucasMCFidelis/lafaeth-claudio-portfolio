"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateHomeImagesOrder } from "@/actions/update-home-images-order";
import { ImageDTO } from "@/app/data/image/image-dto";
import { imagesQueries } from "@/queries/images";

export const getUpdateHomeImagesOrderMutationKey = () =>
  ["update-home-images-order"] as const;

export const useUpdateHomeImagesOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateHomeImagesOrderMutationKey(),
    mutationFn: async (images: Array<ImageDTO>) =>
      await updateHomeImagesOrder(images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imagesQueries.keys.all });
    },
  });
};
