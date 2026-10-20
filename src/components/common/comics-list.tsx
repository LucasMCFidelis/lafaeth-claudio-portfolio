"use client";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { comicsTable } from "@/db/schema";
import { useComicsVisible } from "@/hooks/queries/use-comics-visible";
import { useManyComics } from "@/hooks/queries/use-many-comics";

import ComicItem from "./comic-item";
import ExpandItemButton from "./expand-item-button";

type ComicsListProps = {
  initialData: Array<ComicDTO>;
  displayButtonOpenModal?: boolean;
} & (
  | { variant: "visible" }
  | { variant: "all"; orderBy?: OrderByCondition<typeof comicsTable> }
);

const ComicsList = (props: ComicsListProps) =>
  props.variant === "visible" ? (
    <VisibleComicsList {...props} />
  ) : (
    <AllComicsList {...props} />
  );

const VisibleComicsList = ({
  initialData,
  displayButtonOpenModal,
}: ComicsListProps) => {
  const { data: comics = [] } = useComicsVisible({ initialData });

  return (
    <ComicsGrid
      comics={comics}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllComicsList = ({
  initialData,
  displayButtonOpenModal,
  ...props
}: ComicsListProps) => {
  const { data: comics = [] } = useManyComics({
    params: { initialData },
    orderBy: props.variant === "all" ? props.orderBy : undefined,
    withImage: true,
  });

  return (
    <ComicsGrid
      comics={comics}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

interface ComicsGridProps {
  comics: Array<ComicDTO<boolean>>;
  displayButtonOpenModal?: boolean;
}

const ComicsGrid = ({ comics, displayButtonOpenModal }: ComicsGridProps) => {
  return (
    <>
      {comics.length > 0 ? (
        comics
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
          ))
      ) : (
        <p className="col-span-full text-center">
          Nenhum Quadrinho para ser exibido no momento
        </p>
      )}
    </>
  );
};

export default ComicsList;
