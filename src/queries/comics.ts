import { queryOptions } from "@tanstack/react-query";

import { getComic } from "@/actions/get-comic";
import { getComics } from "@/actions/get-comics";
import { getVisibleComics } from "@/actions/get-visible-comics";
import type { GetComicsProps } from "@/app/data/comics/get-many-comics";

import { cacheTags } from "./tags";

export type ComicsFilters = GetComicsProps;

/** Query keys and options for comics. See colorsQueries. */
export const comicsQueries = {
  tag: cacheTags.comics,
  keys: {
    all: ["comics"] as const,
    visible: () => ["comics", "visible"] as const,
    list: (filters: ComicsFilters = {}) => ["comics", "list", filters] as const,
    detail: (id: string) => ["comics", "detail", id] as const,
  },
  visible: () =>
    queryOptions({
      queryKey: comicsQueries.keys.visible(),
      queryFn: () => getVisibleComics(),
      staleTime: Infinity,
    }),
  list: (filters: ComicsFilters = {}) =>
    queryOptions({
      queryKey: comicsQueries.keys.list(filters),
      queryFn: () => getComics({ ...filters, withImage: true }),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: comicsQueries.keys.detail(id),
      queryFn: () => getComic({ comicId: id }),
    }),
};
