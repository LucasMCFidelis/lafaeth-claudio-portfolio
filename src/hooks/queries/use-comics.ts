"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ComicsFilters, comicsQueries } from "@/queries/comics";

/** Comics shown on the site. Data usually comes from a PrefetchBoundary. */
export const useVisibleComics = () => useSuspenseQuery(comicsQueries.visible());

/** Admin: every comic. */
export const useComicsList = (filters?: ComicsFilters) =>
  useSuspenseQuery(comicsQueries.list(filters));

export const useComic = (comicId: string) =>
  useSuspenseQuery(comicsQueries.detail(comicId));
