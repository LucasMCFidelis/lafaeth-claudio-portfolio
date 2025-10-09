"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlats } from "@/actions/get-many-flats";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";

export const getAllFlatsQueryKey = (where?: WhereCondition<typeof flatTable>) =>
  ["many-flats", where] as const;

export const useManyFlats = (
  where?: WhereCondition<typeof flatTable>,
  params?: {
    initialData: Awaited<ReturnType<typeof getFlats>>;
  }
) => {
  return useQuery({
    queryKey: getAllFlatsQueryKey(),
    queryFn: () => getFlats(where),
    initialData: params?.initialData,
  });
};
