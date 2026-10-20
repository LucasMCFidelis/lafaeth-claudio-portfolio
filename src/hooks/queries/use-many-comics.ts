"use client";

import { useQuery } from "@tanstack/react-query";

import { getComics } from "@/actions/get-comics";
import { GetManyComicsProps } from "@/app/data/comics/get-many-comics";

interface Props extends GetManyComicsProps {
  params?: {
    initialData: Awaited<ReturnType<typeof getComics>>;
  };
}

export const getManyComicsQueryKey = ({
  where,
  orderBy,
  withImage,
}: GetManyComicsProps) => ["many-comics", where, orderBy, withImage] as const;

export const useManyComics = ({ params, where, orderBy, withImage }: Props) => {
  return useQuery({
    queryKey: getManyComicsQueryKey({ where, orderBy, withImage }),
    queryFn: () => getComics({ where, orderBy, withImage }),
    initialData: params?.initialData,
  });
};
