import "server-only";

import { eq, SQLWrapper } from "drizzle-orm";

import { db } from "@/db";
import { comicsTable } from "@/db/schema";

import { ComicDTO } from "./comic-dto";
import mapToComicDTO from "./map-to-comic";

interface GetManyComicsProps<WithImage extends boolean> {
  where?: {
    field: keyof typeof comicsTable.$inferSelect;
    value: string | number | boolean | SQLWrapper;
  };
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
