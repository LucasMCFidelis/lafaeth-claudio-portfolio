"use client";

import { useQuery } from "@tanstack/react-query";

import { getColors } from "@/actions/get-colors";
import { displayOrder } from "@/app/data/order-by-condition";

export const getColorsVisibleQueryKey = () => ["colors-visible"] as const;

export const useColorsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getColors>>;
}) => {
  return useQuery({
    queryKey: getColorsVisibleQueryKey(),
    queryFn: async () =>
      getColors({
        where: { field: "visibleInColorization", value: true },
        orderBy: displayOrder,
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
