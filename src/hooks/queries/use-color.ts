"use client";

import { useQuery } from "@tanstack/react-query";

import { getColor } from "@/actions/get-color";

export const getColorQueryKey = (colorId: string) =>
  ["comic", colorId] as const;

export const useColor = (
  colorId: string,
  params?: { initialData: Awaited<ReturnType<typeof getColor>> }
) => {
  return useQuery({
    queryKey: getColorQueryKey(colorId),
    queryFn: async () => await getColor({ colorId }),
    initialData: params?.initialData,
  });
};
