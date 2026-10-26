"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ColorsFilters, colorsQueries } from "@/queries/colors";

/** Colorizations shown on the site. Data usually comes from a PrefetchBoundary. */
export const useVisibleColors = () => useSuspenseQuery(colorsQueries.visible());

/** Admin: every colorization. */
export const useColorsList = (filters?: ColorsFilters) =>
  useSuspenseQuery(colorsQueries.list(filters));

export const useColor = (colorId: string) =>
  useSuspenseQuery(colorsQueries.detail(colorId));
