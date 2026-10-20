"use client";

import { useQuery } from "@tanstack/react-query";

import { getVisibleColors } from "@/actions/get-visible-colors";

export const getColorsVisibleQueryKey = () => ["colors-visible"] as const;

export const useColorsVisible = (params?: {
  initialData: Awaited<ReturnType<typeof getVisibleColors>>;
}) => {
  return useQuery({
    queryKey: getColorsVisibleQueryKey(),
    queryFn: getVisibleColors,
    initialData: params?.initialData,
  });
};
