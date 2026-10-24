"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProjectImagesOrder } from "@/hooks/mutations/use-update-project-images-order";
import { useProjectImages } from "@/hooks/queries/use-projects";
import { cn } from "@/lib/utils";
import { projectsQueries } from "@/queries/projects";

import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

interface SortableProjectImagesProps {
  projectId: string;
}

const SortableProjectImages = ({ projectId }: SortableProjectImagesProps) => {
  const { data: images } = useProjectImages(projectId);
  const updateOrderMutation = useUpdateProjectImagesOrder();
  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );
  const queryClient = useQueryClient();

  const toggleSortingState = () => {
    setSortingIsDisabled((prev) => !prev);
    if (!sortingIsDisabled) {
      queryClient.invalidateQueries({
        queryKey: projectsQueries.keys.images(projectId),
      });
    }
  };

  if (images.length < 2) return;

  return (
    <>
      <Button type="button" variant="outline" onClick={toggleSortingState}>
        <ArrowDownUp />
        Editar ordem
      </Button>
      <Dialog open={!sortingIsDisabled}>
        <DialogContent
          className="md:max-w-full h-full flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>Ordem das imagens</DialogTitle>
            <DialogDescription>
              Arraste as imagens. A primeira visível vira a capa.
            </DialogDescription>
          </DialogHeader>
          <SortableRootList
            items={images}
            getQueryKeyFunction={() => projectsQueries.keys.images(projectId)}
            className="max-w-full overflow-y-auto"
          >
            <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={cn(
                    "relative aspect-square border-2 shadow-md rounded-xl bg-accent",
                    !image.visibleInProject && "opacity-50"
                  )}
                >
                  <SortableItem
                    item={image}
                    disabled={sortingIsDisabled}
                    className="size-full aspect-auto"
                  />
                  <span className="absolute top-1 left-1 rounded-full bg-background/90 px-2 text-xs font-medium pointer-events-none">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </SortableRootList>
          <div className="w-full flex gap-4">
            <Button
              onClick={toggleSortingState}
              variant={"destructive"}
              className="flex-1"
            >
              Cancelar edição
            </Button>
            <Button
              className="w-1/2"
              disabled={updateOrderMutation.isPending}
              onClick={async () => {
                await updateOrderMutation.mutateAsync(images, {
                  onSuccess: () =>
                    toast.success("Ordem das imagens atualizada com sucesso"),
                  onError: (error) =>
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "Erro ao atualizar ordem das imagens"
                    ),
                });
                setSortingIsDisabled(true);
              }}
            >
              Salvar Ordenação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SortableProjectImages;
