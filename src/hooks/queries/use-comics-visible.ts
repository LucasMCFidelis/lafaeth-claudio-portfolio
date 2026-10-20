"use client";

import { useQuery } from "@tanstack/react-query";

import { getComics } from "@/actions/get-comics";
import { displayOrder } from "@/app/data/order-by-condition";

export const getComicsVisibleQueryKey = () => ["comics-visible"] as const;

export const useComicsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getComics>>;
}) => {
  return useQuery({
    queryKey: getComicsVisibleQueryKey(),
    queryFn: async () =>
      getComics({
        where: { field: "visibleInComics", value: true },
        orderBy: displayOrder,
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
