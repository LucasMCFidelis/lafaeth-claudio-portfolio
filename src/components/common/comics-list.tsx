"use client";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { comicsTable } from "@/db/schema";
import { useManyComics } from "@/hooks/queries/use-many-comics";

import ComicItem from "./comic-item";
import ExpandItemButton from "./expand-item-button";

interface ComicsListProps {
  initialData: Array<ComicDTO>;
  where?: WhereCondition<typeof comicsTable>;
  orderBy?: OrderByCondition<typeof comicsTable>;
  withImage?: boolean;
  displayButtonOpenModal?: boolean;
}
const ComicsList = ({
  initialData,
  where,
  orderBy,
  withImage,
  displayButtonOpenModal,
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
            disableLink={displayButtonOpenModal}
          >
            {displayButtonOpenModal && (
              <ExpandItemButton
                typeLink
                href={`/admin/quadrinhos/update?comicId=${comic.id}`}
              />
            )}
          </ComicItem>
        ))}
    </>
  );
};

export default ComicsList;
