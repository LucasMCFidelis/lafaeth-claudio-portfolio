"use client";

import { useMutation } from "@tanstack/react-query";

import { postFlat } from "@/actions/post-flat";
import { CadastreFlatDTO } from "@/app/data/schemas/cadastre-flat-schema";

export const getPostFlatQueryKey = () => ["post-flat"] as const;

export const usePostFlat = () => {
  return useMutation({
    mutationKey: getPostFlatQueryKey(),
    mutationFn: async (data: CadastreFlatDTO) => await postFlat(data),
  });
};
