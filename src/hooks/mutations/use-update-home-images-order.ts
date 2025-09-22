"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateHomeImagesOrder } from "@/actions/update-home-images-order";
import { ImageDTO } from "@/app/data/image/image-dto";

import { getHomeImagesQueryKey } from "../queries/use-home-images";

export const getUpdateHomeImagesOrderQueryKey = () =>
  ["update-home-images-order"] as const;

export const useUpdateHomeImagesOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateHomeImagesOrderQueryKey(),
    mutationFn: async (images: Array<ImageDTO>) => await updateHomeImagesOrder(images),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getHomeImagesQueryKey() }),
  });
};
