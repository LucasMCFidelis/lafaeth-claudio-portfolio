"use client";

import { useQuery } from "@tanstack/react-query";

import { getVisibleFlats } from "@/actions/get-visible-flats";

export const getFlatsVisibleQueryKey = () => ["flats-visible"] as const;

export const useFlatsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getVisibleFlats>>;
}) => {
  return useQuery({
    queryKey: getFlatsVisibleQueryKey(),
    queryFn: getVisibleFlats,
    initialData: params?.initialData,
  });
};
