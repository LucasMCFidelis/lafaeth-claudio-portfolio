import { useMutation } from "@tanstack/react-query";

import { postComic } from "@/actions/post-comic";
import { CadastreComicDTO } from "@/app/data/schemas/cadastre-comic-schema";

export const getPostComicQueryKey = () => ["post-comic"] as const;

export const usePostComic = () => {
  return useMutation({
    mutationKey: getPostComicQueryKey(),
    mutationFn: async (data: CadastreComicDTO) => await postComic(data),
  });
};
