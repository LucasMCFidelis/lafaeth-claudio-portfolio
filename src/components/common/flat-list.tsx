"use client";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";
import { useManyFlats } from "@/hooks/queries/use-many-flats";

import ExpandItemButton from "./expand-item-button";
import FlatItem from "./flat-item";

interface FlatListProps {
  initialData: Array<FlatDTO>;
  maxSizeItemsMd?: boolean;
  displayButtonOpenModal?: boolean;
  where?: WhereCondition<typeof flatTable>;
  orderBy?: OrderByCondition<typeof flatTable>;
}

const FlatList = ({
  initialData,
  maxSizeItemsMd,
  displayButtonOpenModal,
  where,
  orderBy,
}: FlatListProps) => {
  const { data: flats } = useManyFlats({
    where,
    orderBy,
    params: { initialData },
  });
  return (
    <>
      {flats && flats.length > 0 ? (
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
