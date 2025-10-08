"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFlatsOrder } from "@/actions/update-flats-order";
import { FlatDTO } from "@/app/data/flat/flat-dto";

import { getFlatsVisibleQueryKey } from "../queries/use-flats-visible";

export const getUpdateFlatsOrderQueryKey = () =>
  ["update-flats-order"] as const;

export const useUpdateFlatsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateFlatsOrderQueryKey(),
    mutationFn: async (flats: Array<FlatDTO>) => await updateFlatsOrder(flats),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getFlatsVisibleQueryKey() }),
  });
};
