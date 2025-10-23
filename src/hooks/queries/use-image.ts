"use client";

import { useQuery } from "@tanstack/react-query";

import { getImage } from "@/actions/get-image";

export const getImageQueryKey = (imageId: string) =>
  ["image", imageId] as const;

export const useImage = (
  imageId: string,
  params?: { initialData: Awaited<ReturnType<typeof getImage>> }
) => {
  return useQuery({
    queryKey: getImageQueryKey(imageId),
    queryFn: async () => {
      if (!imageId) return null;
      return await getImage({ imageId });
    },
    enabled: !!imageId,
    initialData: params?.initialData,
  });
};
