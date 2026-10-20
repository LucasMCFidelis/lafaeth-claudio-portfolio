"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteImage } from "@/actions/delete-image";
import { imageDependentQueryKeys } from "@/queries/images";
import { isDetailOf } from "@/queries/is-detail-of";

export const getDeleteImageMutationKey = () => ["delete-image"] as const;

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteImageMutationKey(),
    mutationFn: async (data: { imageId: string; force?: boolean }) =>
      await deleteImage(data),
    onSuccess: (result, { imageId }) => {
      if (!result.deleted) return;
      // Items that used the image lost it, so every list may change. The
      // detail of the deleted image is left alone (it would fail to refetch).
      for (const queryKey of imageDependentQueryKeys) {
        queryClient.invalidateQueries({
          queryKey,
          predicate: (query) => !isDetailOf(query.queryKey, imageId),
        });
      }
    },
  });
};
