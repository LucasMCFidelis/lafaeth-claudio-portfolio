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
    queryFn: () => getImage({ imageId }),
    initialData: params?.initialData,
  });
};
