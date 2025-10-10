"use client";

import { Expand } from "lucide-react";
import Link from "next/link";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { flatTable } from "@/db/schema";
import { useManyFlats } from "@/hooks/queries/use-many-flats";

import { Button } from "../ui/button";
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
      {flats &&
        flats.map((flat) => {
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
                <Button className="absolute top-0 right-0 z-30" asChild>
                  <Link href={`/admin/flat/update?flatId=${flat.id}`}>
                    <Expand />
                  </Link>
                </Button>
              )}
            </FlatItem>
          );
        })}
    </>
  );
};

export default FlatList;
