"use client";

import { useQuery } from "@tanstack/react-query";

import { getColors } from "@/actions/get-colors";

export const getColorsVisibleQueryKey = () => ["colors-visible"] as const;

export const useColorsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getColors>>;
}) => {
  return useQuery({
    queryKey: getColorsVisibleQueryKey(),
    queryFn: async () =>
      getColors({
        where: { field: "visibleInColorization", value: true },
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
