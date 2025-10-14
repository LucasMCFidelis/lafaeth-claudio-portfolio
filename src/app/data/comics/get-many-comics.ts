import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { comicsTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { WhereCondition } from "../where-condition";
import { ComicDTO } from "./comic-dto";
import mapToComicDTO from "./map-to-comic";

export interface GetComicsProps {
  where?: WhereCondition<typeof comicsTable>;
  orderBy?: OrderByCondition<typeof comicsTable>;
}

export interface GetManyComicsProps<WithImage extends boolean = boolean>
  extends GetComicsProps {
  withImage?: WithImage;
}

const getManyComics = async <WithImage extends boolean>({
  where,
  withImage,
}: GetManyComicsProps<WithImage>): Promise<Array<ComicDTO<WithImage>>> => {
  const comics = await db.query.comicsTable.findMany({
    ...(where && { where: eq(comicsTable[where.field], where.value) }),
    ...(withImage && { with: { image: true } }),
  });

  return comics.map((comic) => mapToComicDTO({ data: comic, withImage }));
};

export default getManyComics;
