import { queryOptions } from "@tanstack/react-query";

import { getFlat } from "@/actions/get-flat";
import { getFlats, GetFlatsProps } from "@/actions/get-flats";
import { getVisibleFlats } from "@/actions/get-visible-flats";

import { cacheTags } from "./tags";

export type FlatsFilters = GetFlatsProps;

/** Query keys and options for flats. See colorsQueries. */
export const flatsQueries = {
  tag: cacheTags.flats,
  keys: {
    all: ["flats"] as const,
    visible: () => ["flats", "visible"] as const,
    list: (filters: FlatsFilters = {}) => ["flats", "list", filters] as const,
    detail: (id: string) => ["flats", "detail", id] as const,
  },
  visible: () =>
    queryOptions({
      queryKey: flatsQueries.keys.visible(),
      queryFn: () => getVisibleFlats(),
      staleTime: Infinity,
    }),
  list: (filters: FlatsFilters = {}) =>
    queryOptions({
      queryKey: flatsQueries.keys.list(filters),
      queryFn: () => getFlats(filters),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: flatsQueries.keys.detail(id),
      queryFn: () => getFlat({ flatId: id }),
    }),
};
