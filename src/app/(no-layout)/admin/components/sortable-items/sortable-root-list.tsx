"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  type SortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { parseAsBoolean } from "nuqs";
import { useId } from "react";

import { cn } from "@/lib/utils";

import { BasicItemToSortable } from "./basic-item-to-sortable";

interface SortableRootListProps<T extends BasicItemToSortable> {
  items: Array<T>;
  getQueryKeyFunction: () => QueryKey;
  /** dnd-kit strategy; grids use `rectSortingStrategy`. */
  strategy?: SortingStrategy;
  className?: string;
  children: React.ReactNode;
}

export const getSortingIsDisabledQueryStateParams = (initialState?: boolean) =>
  [
    "sortingIsDisabled",
    parseAsBoolean.withDefault(initialState ?? true),
  ] as const;

export default function SortableRootList<T extends BasicItemToSortable>({
  items,
  getQueryKeyFunction,
  strategy = verticalListSortingStrategy,
  className,
  children,
}: SortableRootListProps<T>) {
  const queryClient = useQueryClient();
  // Without a stable id, dnd-kit numbers its aria-describedby with a global
  // counter, which differs between the server and the client.
  const dndContextId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      queryClient.setQueryData<Array<T>>(getQueryKeyFunction(), (items) => {
        if (!items) return;
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={strategy}>
          <div
            className={cn(
              "w-full flex-1 max-w-screen flex flex-col gap-6",
              className
            )}
          >
            {children}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
