"use client";

import { useQuery } from "@tanstack/react-query";

import { getColors } from "@/actions/get-colors";
import { GetManyColorsProps } from "@/app/data/colorization/get-many-colors";
import { WhereCondition } from "@/app/data/where-condition";
import { comicsTable } from "@/db/schema";

interface Props<WithImage extends boolean>
  extends GetManyColorsProps<WithImage> {
  params?: {
    initialData: Awaited<ReturnType<typeof getColors>>;
  };
}

export const getManyColorsQueryKey = (
  where?: WhereCondition<typeof comicsTable>
) => ["comics", where] as const;

export const useManyColors = <WithImage extends boolean>({
  params,
  where,
  orderBy,
  withImage,
}: Props<WithImage>) => {
  return useQuery({
    queryKey: getManyColorsQueryKey(),
    queryFn: () => getColors({ where, orderBy, withImage }),
    initialData: params?.initialData,
  });
};
