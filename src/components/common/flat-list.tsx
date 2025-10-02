"use client";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { useFlatsVisible } from "@/hooks/queries/use-flats-visible";

import FlatItem from "./flat-item";

interface FlatListProps {
  initialData: Array<FlatDTO>;
  maxSizeItemsMd?: boolean
}

const FlatList = ({ initialData, maxSizeItemsMd }: FlatListProps) => {
  const { data: flats } = useFlatsVisible({ initialData });
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
              frontImageUrl={flat.frontImage?.imageUrl}
              backImageUrl={flat.backImage?.imageUrl}
              maxSizeItemsMd={maxSizeItemsMd}
            />
          );
        })}
    </>
  );
};

export default FlatList;
