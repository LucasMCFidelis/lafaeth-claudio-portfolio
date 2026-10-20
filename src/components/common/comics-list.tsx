"use client";

import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { ComicDTO } from "@/app/data/comics/comic-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { comicsTable } from "@/db/schema";
import { useComicsList, useVisibleComics } from "@/hooks/queries/use-comics";

import ComicItem from "./comic-item";
import ExpandItemButton from "./expand-item-button";

type ComicsListProps = {
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

const VisibleComicsList = ({ displayButtonOpenModal }: ComicsListProps) => {
  const { data: comics } = useVisibleComics();

  return (
    <ComicsGrid
      comics={comics}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllComicsList = ({
  displayButtonOpenModal,
  ...props
}: ComicsListProps) => {
  const { data: comics } = useComicsList({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
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
          .map((comic, index) => (
            <ComicItem
              key={comic.id}
              title={comic.image!.title}
              imageId={comic.image!.id}
              imageUrl={comic.image!.imageUrl}
              visibleInComics={comic.visibleInComics}
              disableLink={displayButtonOpenModal}
              index={index}
            >
              {displayButtonOpenModal && (
                <>
                  <VisibilitySwitch
                    entity="comic"
                    id={comic.id}
                    visible={comic.visibleInComics}
                  />
                  <ExpandItemButton
                    typeLink
                    href={`/admin/quadrinhos/update?comicId=${comic.id}`}
                  />
                </>
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
