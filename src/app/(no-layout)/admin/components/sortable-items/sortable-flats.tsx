"use client";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import {
  getFlatsVisibleQueryKey,
  useFlatsVisible,
} from "@/hooks/queries/use-flats-visible";

import SortableItem from "./sortable-item";
import SortableRootList from "./sortable-root-list";

interface SortableFlatsProps {
  initialData?: Array<FlatDTO>;
}

const SortableFlats = ({ initialData }: SortableFlatsProps) => {
  const { data: flats = [] } = useFlatsVisible(initialData && { initialData });
  const sortableFlats = flats.map((flat) => {
    return {
      id: flat.id,
      title: flat.title,
      imageUrl: flat.backImage?.imageUrl || flat.frontImage?.imageUrl || "",
    };
  });

  return (
    <SortableRootList
      items={sortableFlats}
      getQueryKeyFunction={getFlatsVisibleQueryKey} className="max-w-full"
    >
      {sortableFlats.map((item) => (
        <SortableItem
          key={item.id}
          item={item}
          className="w-full"
        />
      ))}
    </SortableRootList>
  );
};

export default SortableFlats;
