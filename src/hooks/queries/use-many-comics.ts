"use client";

import { useQuery } from "@tanstack/react-query";

import { getComics } from "@/actions/get-comics";
import { GetManyComicsProps } from "@/app/data/comics/get-many-comics";
import { WhereCondition } from "@/app/data/where-condition";
import { comicsTable } from "@/db/schema";

interface Props extends GetManyComicsProps {
  params?: {
    initialData: Awaited<ReturnType<typeof getComics>>;
  };
}

export const getManyComicsQueryKey = (
  where?: WhereCondition<typeof comicsTable>
) => ["comics", where] as const;

export const useManyComics = ({ params, where, orderBy, withImage }: Props) => {
  return useQuery({
    queryKey: getManyComicsQueryKey(),
    queryFn: () => getComics({ where, orderBy, withImage }),
    initialData: params?.initialData,
  });
};
