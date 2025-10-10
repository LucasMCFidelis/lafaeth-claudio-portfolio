"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlat } from "@/actions/get-flat";

export const getFlatQueryKey = (flatId: string) =>
  ["flat", flatId] as const;

export const useFlat = (
  flatId: string,
  params?: { initialData: Awaited<ReturnType<typeof getFlat>> }
) => {
  return useQuery({
    queryKey: getFlatQueryKey(flatId),
    queryFn: async() => await getFlat({ flatId }),
    initialData: params?.initialData,
  });
};
