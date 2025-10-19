import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { comicsTable } from "@/db/schema";

import { ComicDTO } from "./comic-dto";
import mapToComicDTO from "./map-to-comic";

export interface GetOneComicProps {
  comicId: string;
}

const getOneComic = async ({
  comicId,
}: GetOneComicProps): Promise<ComicDTO> => {
  const comic = await db.query.comicsTable.findFirst({
    where: eq(comicsTable.id, comicId),
    with: { image: true },
  });

  if (!comic) throw new Error("Comic not found");

  return mapToComicDTO({ data: comic, withImage: true });
};

export default getOneComic;
