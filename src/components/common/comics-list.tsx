"use client";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { comicsTable } from "@/db/schema";
import { useManyComics } from "@/hooks/queries/use-many-comics";

import ComicItem from "./comic-item";

interface ComicsListProps {
  initialData: Array<ComicDTO>;
  where?: WhereCondition<typeof comicsTable>;
  orderBy?: OrderByCondition<typeof comicsTable>;
  withImage?: boolean;
}
const ComicsList = ({
  initialData,
  where,
  orderBy,
  withImage,
}: ComicsListProps) => {
  const { data: comics = [] } = useManyComics({
    params: { initialData },
    where,
    orderBy,
    withImage,
  });

  return (
    <>
      {comics
        .filter((comic) => comic.image)
        .map((comic) => (
          <ComicItem
            key={comic.id}
            title={comic.image!.title}
            imageId={comic.image!.id}
            imageUrl={comic.image!.imageUrl}
            visibleInComics={comic.visibleInComics}
          />
        ))}
    </>
  );
};

export default ComicsList;
