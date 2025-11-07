"use client";

import { useQuery } from "@tanstack/react-query";

import { getIllustrations } from "@/actions/get-illustrations";

export const getIllustrationsVisibleQueryKey = () =>
  ["illustrations-visible"] as const;

export const useIllustrationsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getIllustrations>>;
}) => {
  return useQuery({
    queryKey: getIllustrationsVisibleQueryKey(),
    queryFn: async () =>
      getIllustrations({
        where: { field: "visibleInIllustrations", value: true },
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
