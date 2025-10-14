"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getManyComics, {
  GetManyComicsProps,
} from "@/app/data/comics/get-many-comics";

export const getComics = async <WithImage extends boolean = boolean>({
  where,
  orderBy,
  withImage = false as WithImage,
}: GetManyComicsProps<WithImage>): Promise<Array<ComicDTO<WithImage>>> => {
  const comics = await getManyComics({
    where,
    orderBy,
    withImage,
  });

  return comics;
};
