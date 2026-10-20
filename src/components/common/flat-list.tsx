"use client";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { flatTable } from "@/db/schema";
import { useFlatsVisible } from "@/hooks/queries/use-flats-visible";
import { useManyFlats } from "@/hooks/queries/use-many-flats";

import ExpandItemButton from "./expand-item-button";
import FlatItem from "./flat-item";

type FlatListProps = {
  initialData: Array<FlatDTO>;
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
  initialData,
  maxSizeItemsMd,
  displayButtonOpenModal,
}: FlatListProps) => {
  const { data: flats = [] } = useFlatsVisible({ initialData });

  return (
    <FlatGrid
      flats={flats}
      maxSizeItemsMd={maxSizeItemsMd}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllFlatList = ({
  initialData,
  maxSizeItemsMd,
  displayButtonOpenModal,
  ...props
}: FlatListProps) => {
  const { data: flats = [] } = useManyFlats({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
    params: { initialData },
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
          {flats.map((flat) => {
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
