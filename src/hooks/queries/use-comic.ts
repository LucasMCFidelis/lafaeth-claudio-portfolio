"use client";

import { useQuery } from "@tanstack/react-query";

import { getComic } from "@/actions/get-comic";

export const getComicQueryKey = (comicId: string) =>
  ["comic", comicId] as const;

export const useComic = (
  comicId: string,
  params?: { initialData: Awaited<ReturnType<typeof getComic>> }
) => {
  return useQuery({
    queryKey: getComicQueryKey(comicId),
    queryFn: async() => await getComic({ comicId }),
    initialData: params?.initialData,
  });
};
