"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlats, GetFlatsProps } from "@/actions/get-many-flats";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";

interface Props extends GetFlatsProps {
  params?: {
    initialData: Awaited<ReturnType<typeof getFlats>>;
  };
}

export const getAllFlatsQueryKey = (where?: WhereCondition<typeof flatTable>) =>
  ["many-flats", where] as const;

export const useManyFlats = ({ where, orderBy, params }: Props) => {
  return useQuery({
    queryKey: getAllFlatsQueryKey(),
    queryFn: () => getFlats({ where, orderBy }),
    initialData: params?.initialData,
  });
};
