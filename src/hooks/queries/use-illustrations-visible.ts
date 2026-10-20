"use client";

import { useQuery } from "@tanstack/react-query";

import { getVisibleIllustrations } from "@/actions/get-visible-illustrations";

export const getIllustrationsVisibleQueryKey = () =>
  ["illustrations-visible"] as const;

export const useIllustrationsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getVisibleIllustrations>>;
}) => {
  return useQuery({
    queryKey: getIllustrationsVisibleQueryKey(),
    queryFn: getVisibleIllustrations,
    initialData: params?.initialData,
  });
};
