import "server-only";

import { ComicDTO } from "./comic-dto";
import getOneComic from "./get-one-comic";

export interface GetOneComicByIdProps {
  comicId: string;
}

const getOneComicById = async ({
  comicId,
}: GetOneComicByIdProps): Promise<ComicDTO> => {
  const comic = await getOneComic({ where: { field: "id", value: comicId } });

  return comic;
};

export default getOneComicById;
