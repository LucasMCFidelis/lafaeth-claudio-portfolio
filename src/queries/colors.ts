import { queryOptions } from "@tanstack/react-query";

import { getColor } from "@/actions/get-color";
import { getColors } from "@/actions/get-colors";
import { getVisibleColors } from "@/actions/get-visible-colors";
import type { GetManyColorsProps } from "@/app/data/colorization/get-many-colors";

import { cacheTags } from "./tags";

export type ColorsFilters = Pick<GetManyColorsProps<true>, "where" | "orderBy">;

/**
 * Query keys and options for colorizations, shared by the server prefetch
 * (PrefetchBoundary) and the client hooks so both use the same identity.
 */
export const colorsQueries = {
  tag: cacheTags.colors,
  keys: {
    all: ["colors"] as const,
    visible: () => ["colors", "visible"] as const,
    list: (filters: ColorsFilters = {}) => ["colors", "list", filters] as const,
    detail: (id: string) => ["colors", "detail", id] as const,
  },
  /** Public list. Only changes through the admin, which invalidates it. */
  visible: () =>
    queryOptions({
      queryKey: colorsQueries.keys.visible(),
      queryFn: () => getVisibleColors(),
      staleTime: Infinity,
    }),
  /** Admin list, hidden items included. */
  list: (filters: ColorsFilters = {}) =>
    queryOptions({
      queryKey: colorsQueries.keys.list(filters),
      queryFn: () => getColors({ ...filters, withImage: true }),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: colorsQueries.keys.detail(id),
      queryFn: () => getColor({ colorId: id }),
    }),
};
