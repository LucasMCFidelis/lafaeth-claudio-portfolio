"use client";

import { useQuery } from "@tanstack/react-query";

import { getVisibleComics } from "@/actions/get-visible-comics";

export const getComicsVisibleQueryKey = () => ["comics-visible"] as const;

export const useComicsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getVisibleComics>>;
}) => {
  return useQuery({
    queryKey: getComicsVisibleQueryKey(),
    queryFn: getVisibleComics,
    initialData: params?.initialData,
  });
};
