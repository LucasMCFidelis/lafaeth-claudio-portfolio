"use client";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { flatTable } from "@/db/schema";
import { useFlatsList, useVisibleFlats } from "@/hooks/queries/use-flats";

import ExpandItemButton from "./expand-item-button";
import FlatItem from "./flat-item";

type FlatListProps = {
  maxSizeItemsMd?: boolean;
  displayButtonOpenModal?: boolean;
} & (
  | { variant: "visible" }
  | { variant: "all"; orderBy?: OrderByCondition<typeof flatTable> }
);

const FlatList = (props: FlatListProps) =>
  props.variant === "visible" ? (
    <VisibleFlatList {...props} />
  ) : (
    <AllFlatList {...props} />
  );

const VisibleFlatList = ({
  maxSizeItemsMd,
  displayButtonOpenModal,
}: FlatListProps) => {
  const { data: flats } = useVisibleFlats();

  return (
    <FlatGrid
      flats={flats}
      maxSizeItemsMd={maxSizeItemsMd}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllFlatList = ({
  maxSizeItemsMd,
  displayButtonOpenModal,
  ...props
}: FlatListProps) => {
  const { data: flats } = useFlatsList({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
  });

  return (
    <FlatGrid
      flats={flats}
      maxSizeItemsMd={maxSizeItemsMd}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

interface FlatGridProps {
  flats: Array<FlatDTO>;
  maxSizeItemsMd?: boolean;
  displayButtonOpenModal?: boolean;
}

const FlatGrid = ({
  flats,
  maxSizeItemsMd,
  displayButtonOpenModal,
}: FlatGridProps) => {
  return (
    <>
      {flats.length > 0 ? (
        <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
          {flats.map((flat, index) => {
            const screenwriter =
              flat.backImage?.screenwriter || flat.frontImage?.screenwriter;
            const artist = flat.backImage?.artist || flat.frontImage?.artist;
            return (
              <FlatItem
                key={flat.id}
                title={flat.title}
                artist={artist || ""}
                screenwriter={screenwriter || ""}
                horizontalPage={flat.horizontalPage}
                visibleInFlat={flat.visibleInFlat}
                frontImageUrl={flat.frontImage?.imageUrl}
                backImageUrl={flat.backImage?.imageUrl}
                maxSizeItemsMd={maxSizeItemsMd}
                index={index}
              >
                {displayButtonOpenModal && (
                  <ExpandItemButton
                    typeLink
                    href={`/admin/flat/update?flatId=${flat.id}`}
                  />
                )}
              </FlatItem>
            );
          })}
        </div>
      ) : (
        <p className="col-span-full text-center">
          Nenhum Flat para ser exibido no momento
        </p>
      )}
    </>
  );
};

export default FlatList;
