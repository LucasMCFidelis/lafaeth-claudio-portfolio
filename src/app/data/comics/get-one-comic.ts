import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { comicsTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { ComicDTO } from "./comic-dto";
import mapToComicDTO from "./map-to-comic";

export interface GetOneComicProps {
  where: WhereCondition<typeof comicsTable>;
}

const getOneComic = async ({ where }: GetOneComicProps): Promise<ComicDTO> => {
  const comic = await db.query.comicsTable.findFirst({
    where: eq(comicsTable[where.field], where.value),
    with: { image: true },
  });

  if (!comic) throw new Error("Comic not found");

  return mapToComicDTO({ data: comic, withImage: true });
};

export default getOneComic;
