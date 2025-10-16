"use client";

import { useQuery } from "@tanstack/react-query";

import { getComics } from "@/actions/get-comics";

export const getComicsVisibleQueryKey = () => ["comics-visible"] as const;

export const useComicsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getComics>>;
}) => {
  return useQuery({
    queryKey: getComicsVisibleQueryKey(),
    queryFn: async () =>
      getComics({
        where: { field: "visibleInComics", value: true },
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
