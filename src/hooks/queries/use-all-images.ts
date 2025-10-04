"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllImages } from "@/actions/get-all-images";

export const getAllImagesQueryKey = () => ["all-images"] as const;

export const useAllImages = (params?: {
  initialData: Awaited<ReturnType<typeof getAllImages>>;
}) => {
  return useQuery({
    queryKey: getAllImagesQueryKey(),
    queryFn: getAllImages,
    initialData: params?.initialData,
  });
};
