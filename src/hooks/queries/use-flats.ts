"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { FlatsFilters, flatsQueries } from "@/queries/flats";

/** Flats shown on the site. Data usually comes from a PrefetchBoundary. */
export const useVisibleFlats = () => useSuspenseQuery(flatsQueries.visible());

/** Admin: every flat. */
export const useFlatsList = (filters?: FlatsFilters) =>
  useSuspenseQuery(flatsQueries.list(filters));

export const useFlat = (flatId: string) =>
  useSuspenseQuery(flatsQueries.detail(flatId));
