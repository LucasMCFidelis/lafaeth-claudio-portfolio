"use client";

import { rectSortingStrategy } from "@dnd-kit/sortable";
import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { ArrowDownUp, RectangleHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { BasicItemToSortable } from "./basic-item-to-sortable";
import SortableItem from "./sortable-item";
import SortableRootList from "./sortable-root-list";

export type SortableImageItem = BasicItemToSortable & {
  /** Shows the "Horizontal" badge on the tile. */
  horizontalPage?: boolean;
  /** Dims the tile (item not shown on the site). */
  hidden?: boolean;
};

interface SortableImagesDialogProps<T extends SortableImageItem> {
  /** Items in the current order, with the same ids as the list cached at `queryKey`. */
  items: Array<T>;
  /** Query whose cached list is reordered while dragging and refetched on cancel. */
  queryKey: QueryKey;
  title: string;
  description: string;
  /** Saves the order of the cached list. */
  onSave: () => Promise<unknown>;
  isSaving: boolean;
  successMessage: string;
  errorMessage: string;
  triggerClassName?: string;
}

/**
 * "Editar ordem" button + dialog with a grid of square thumbnails to reorder
 * by drag and drop. Each tile shows its position and, when horizontal, a badge.
 */
export default function SortableImagesDialog<T extends SortableImageItem>({
  items,
  queryKey,
  title,
  description,
  onSave,
  isSaving,
  successMessage,
  errorMessage,
  triggerClassName,
}: SortableImagesDialogProps<T>) {
  const [isSorting, setIsSorting] = useState(false);
  const queryClient = useQueryClient();

  const cancelSorting = () => {
    setIsSorting(false);
    queryClient.invalidateQueries({ queryKey });
  };

  const saveSorting = async () => {
    try {
      await onSave();
      toast.success(successMessage);
      setIsSorting(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errorMessage);
    }
  };

  if (items.length < 2) return null;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsSorting(true)}
        className={triggerClassName}
      >
        <ArrowDownUp />
        Editar ordem
      </Button>
      <Dialog open={isSorting}>
        <DialogContent
          className="md:max-w-full h-full flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <SortableRootList
            items={items}
            getQueryKeyFunction={() => queryKey}
            strategy={rectSortingStrategy}
            className="max-w-full overflow-y-auto"
          >
            <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative aspect-square border-2 shadow-md rounded-xl bg-accent",
                    item.hidden && "opacity-50"
                  )}
                >
                  <SortableItem item={item} className="size-full aspect-auto">
                    {item.horizontalPage && (
                      <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded-full bg-background/90 px-2 text-xs font-medium pointer-events-none">
                        <RectangleHorizontal className="size-3" aria-hidden />
                        Horizontal
                      </span>
                    )}
                  </SortableItem>
                  <span className="absolute top-1 left-1 rounded-full bg-background/90 px-2 text-xs font-medium pointer-events-none">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </SortableRootList>
          <div className="w-full flex gap-4">
            <Button
              onClick={cancelSorting}
              variant={"destructive"}
              className="flex-1"
              disabled={isSaving}
            >
              Cancelar edição
            </Button>
            <Button className="w-1/2" disabled={isSaving} onClick={saveSorting}>
              Salvar Ordenação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
