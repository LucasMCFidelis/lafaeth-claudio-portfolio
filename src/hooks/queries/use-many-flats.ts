"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlats, GetFlatsProps } from "@/actions/get-flats";

interface Props extends GetFlatsProps {
  params?: {
    initialData: Awaited<ReturnType<typeof getFlats>>;
  };
}

export const getAllFlatsQueryKey = ({ where, orderBy }: GetFlatsProps) =>
  ["many-flats", where, orderBy] as const;

export const useManyFlats = ({ where, orderBy, params }: Props) => {
  return useQuery({
    queryKey: getAllFlatsQueryKey({ where, orderBy }),
    queryFn: () => getFlats({ where, orderBy }),
    initialData: params?.initialData,
  });
};
