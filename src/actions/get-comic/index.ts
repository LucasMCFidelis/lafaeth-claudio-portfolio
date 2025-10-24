"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getOneComicById from "@/app/data/comics/get-one-comic-by-id";

export const getComic = async ({
  comicId,
}: {
  comicId: string;
}): Promise<ComicDTO> => {
  const comic = await getOneComicById({
    comicId,
  });
  return comic;
};
