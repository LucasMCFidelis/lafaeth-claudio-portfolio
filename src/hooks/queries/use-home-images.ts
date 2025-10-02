"use client";

import { useQuery } from "@tanstack/react-query";

import { getHomeImages } from "@/actions/get-home-images";

export const getHomeImagesQueryKey = () => ["home-images"] as const;

export const useHomeImages = (params?:{initialData: Awaited<ReturnType<typeof getHomeImages>> }) => {
  return useQuery({
    queryKey: getHomeImagesQueryKey(),
    queryFn: getHomeImages,
    initialData: params?.initialData
  });
};
