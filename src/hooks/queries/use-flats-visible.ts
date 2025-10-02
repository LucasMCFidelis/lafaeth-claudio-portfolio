"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlatsVisible } from "@/actions/get-flats-visible";

export const getFlatsVisibleQueryKey = () => ["flats-visible"] as const;

export const useFlatsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getFlatsVisible>>;
}) => {
  return useQuery({
    queryKey: getFlatsVisibleQueryKey(),
    queryFn: getFlatsVisible,
    initialData: params?.initialData,
  });
};
