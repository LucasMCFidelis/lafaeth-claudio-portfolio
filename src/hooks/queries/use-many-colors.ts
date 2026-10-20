"use client";

import { useQuery } from "@tanstack/react-query";

import { getColors } from "@/actions/get-colors";
import { GetManyColorsProps } from "@/app/data/colorization/get-many-colors";

interface Props<WithImage extends boolean>
  extends GetManyColorsProps<WithImage> {
  params?: {
    initialData: Awaited<ReturnType<typeof getColors>>;
  };
}

export const getManyColorsQueryKey = ({
  where,
  orderBy,
  withImage,
}: GetManyColorsProps<boolean>) =>
  ["many-colors", where, orderBy, withImage] as const;

export const useManyColors = <WithImage extends boolean>({
  params,
  where,
  orderBy,
  withImage,
}: Props<WithImage>) => {
  return useQuery({
    queryKey: getManyColorsQueryKey({ where, orderBy, withImage }),
    queryFn: () => getColors({ where, orderBy, withImage }),
    initialData: params?.initialData,
  });
};
