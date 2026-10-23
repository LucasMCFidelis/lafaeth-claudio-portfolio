"use client";

import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { ComicDTO } from "@/app/data/comics/comic-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { comicsTable } from "@/db/schema";
import {
  centeredGridClassName,
  centeredGridItemClassName,
  centeredGridStyles,
} from "@/helpers/centered-grid";
import { useComicsList, useVisibleComics } from "@/hooks/queries/use-comics";
import { cn } from "@/lib/utils";

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
  const comicsWithImage = comics.filter((comic) => comic.image);
  // Comics are always portrait: a single column wide.
  const itemStyles = centeredGridStyles(comicsWithImage.map(() => false));

  if (comicsWithImage.length === 0) {
    return (
      <p className="text-center">
        Nenhum Quadrinho para ser exibido no momento
      </p>
    );
  }

  return (
    <div className={cn("w-full", centeredGridClassName)}>
      {comicsWithImage.map((comic, index) => (
        <div
          key={comic.id}
          className={centeredGridItemClassName}
          style={itemStyles[index]}
        >
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
        </div>
      ))}
    </div>
  );
};

export default ComicsList;
