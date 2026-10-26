"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getOneComicById from "@/app/data/comics/get-one-comic-by-id";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getComic = async ({
  comicId,
}: {
  comicId: string;
}): Promise<ComicDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const comic = await getOneComicById({
    comicId,
  });
  return comic;
};
