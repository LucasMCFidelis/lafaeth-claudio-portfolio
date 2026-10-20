"use client";

import { useQuery } from "@tanstack/react-query";

import { getIllustrations } from "@/actions/get-illustrations";
import { GetManyIllustrationsProps } from "@/app/data/illustrations/get-many-illustration";

interface Props extends GetManyIllustrationsProps<boolean> {
  params?: {
    initialData: Awaited<ReturnType<typeof getIllustrations>>;
  };
}

export const getManyIllustrationsQueryKey = ({
  where,
  orderBy,
}: Pick<GetManyIllustrationsProps<boolean>, "where" | "orderBy">) =>
  ["many-illustrations", where, orderBy] as const;

export const useManyIllustrations = ({ where, orderBy, params }: Props) => {
  return useQuery({
    queryKey: getManyIllustrationsQueryKey({ where, orderBy }),
    queryFn: async () =>
      getIllustrations({
        where,
        orderBy,
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
