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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

import { BasicItemToSortable } from "./basic-item-to-sortable";

interface SortableRootListProps<T extends BasicItemToSortable> {
  items: Array<T>;
  getQueryKeyFunction: () => readonly [string];
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
  className,
  children,
}: SortableRootListProps<T>) {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useQueryState(
    "mounted",
    parseAsBoolean.withDefault(false)
  );

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

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

  if (!mounted) return null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
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
