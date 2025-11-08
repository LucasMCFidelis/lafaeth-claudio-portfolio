"use client";

import { useQuery } from "@tanstack/react-query";

import { getIllustrations } from "@/actions/get-illustrations";
import { GetManyIllustrationsProps } from "@/app/data/illustrations/get-many-illustration";
import { WhereCondition } from "@/app/data/where-condition";
import { illustrationsTable } from "@/db/schema";

interface Props extends GetManyIllustrationsProps<boolean> {
  params?: {
    initialData: Awaited<ReturnType<typeof getIllustrations>>;
  };
}

export const getManyIllustrationsQueryKey = (
  where?: WhereCondition<typeof illustrationsTable>
) => ["many-illustrations", where] as const;

export const useManyIllustrations = ({ where, orderBy, params }: Props) => {
  return useQuery({
    queryKey: getManyIllustrationsQueryKey(where),
    queryFn: async () =>
      getIllustrations({
        where,
        orderBy,
        withImage: true,
      }),
    initialData: params?.initialData,
  });
};
