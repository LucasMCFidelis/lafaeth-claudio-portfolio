import { queryOptions } from "@tanstack/react-query";

import { getIllustration } from "@/actions/get-illustration";
import { getIllustrations } from "@/actions/get-illustrations";
import { getVisibleIllustrations } from "@/actions/get-visible-illustrations";
import type { GetManyIllustrationsProps } from "@/app/data/illustrations/get-many-illustration";

import { cacheTags } from "./tags";

export type IllustrationsFilters = Pick<
  GetManyIllustrationsProps<true>,
  "where" | "orderBy"
>;

/** Query keys and options for illustrations. See colorsQueries. */
export const illustrationsQueries = {
  tag: cacheTags.illustrations,
  keys: {
    all: ["illustrations"] as const,
    visible: () => ["illustrations", "visible"] as const,
    list: (filters: IllustrationsFilters = {}) =>
      ["illustrations", "list", filters] as const,
    detail: (id: string) => ["illustrations", "detail", id] as const,
  },
  visible: () =>
    queryOptions({
      queryKey: illustrationsQueries.keys.visible(),
      queryFn: () => getVisibleIllustrations(),
      staleTime: Infinity,
    }),
  list: (filters: IllustrationsFilters = {}) =>
    queryOptions({
      queryKey: illustrationsQueries.keys.list(filters),
      queryFn: () => getIllustrations({ ...filters, withImage: true }),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: illustrationsQueries.keys.detail(id),
      queryFn: () => getIllustration({ illustrationId: id }),
    }),
};
