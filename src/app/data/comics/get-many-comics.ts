import "server-only";

import { db } from "@/db";
import { comicsTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
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
  orderBy,
  withImage,
}: GetManyComicsProps<WithImage>): Promise<Array<ComicDTO<WithImage>>> => {
  const comics = await db.query.comicsTable.findMany({
    where: buildWhere(comicsTable, where),
    orderBy: buildOrderBy(comicsTable, orderBy),
    ...(withImage && { with: { image: true } }),
  });

  return comics.map((comic) => mapToComicDTO({ data: comic, withImage }));
};

export default getManyComics;
