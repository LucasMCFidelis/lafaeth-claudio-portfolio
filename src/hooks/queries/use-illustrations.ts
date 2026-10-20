"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  IllustrationsFilters,
  illustrationsQueries,
} from "@/queries/illustrations";

/** Illustrations shown on the site. Data usually comes from a PrefetchBoundary. */
export const useVisibleIllustrations = () =>
  useSuspenseQuery(illustrationsQueries.visible());

/** Admin: every illustration. */
export const useIllustrationsList = (filters?: IllustrationsFilters) =>
  useSuspenseQuery(illustrationsQueries.list(filters));

export const useIllustration = (illustrationId: string) =>
  useSuspenseQuery(illustrationsQueries.detail(illustrationId));
