import { useMutation } from "@tanstack/react-query";

import { postColor } from "@/actions/post-color";
import { CadastreColorDTO } from "@/app/data/schemas/cadastre-color-schema";

export const getPostColorQueryKey = () => ["post-color"] as const;

export const usePostColor = () => {
  return useMutation({
    mutationKey: getPostColorQueryKey(),
    mutationFn: async (data: CadastreColorDTO) => await postColor(data),
  });
};
