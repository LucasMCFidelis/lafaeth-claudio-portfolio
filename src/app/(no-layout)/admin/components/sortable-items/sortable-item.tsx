"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { BasicItemToSortable } from "./basic-item-to-sortable";

interface SortableItemProps<T extends BasicItemToSortable> {
  item: T;
  disabled?: boolean;
  className?: string;
}

const SortableItem = <T extends BasicItemToSortable>({
  item,
  disabled,
  className,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!disabled ? listeners : {})}
      className={cn("cursor-move relative aspect-square size-52 overflow-hidden rounded-xl", className)}
    >
      <Image
        src={item.imageUrl}
        alt={item.imageUrl}
        fill
        className="object-cover"
      />
    </button>
  );
};

export default SortableItem;
