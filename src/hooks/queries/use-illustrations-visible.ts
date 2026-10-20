"use client";

import { useQuery } from "@tanstack/react-query";

import { getIllustrations } from "@/actions/get-illustrations";
import { displayOrder } from "@/app/data/order-by-condition";

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
        orderBy: displayOrder,
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
