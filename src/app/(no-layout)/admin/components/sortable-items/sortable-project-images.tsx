"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
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
import { useUpdateProjectImagesOrder } from "@/hooks/mutations/use-update-project-images-order";
import { useProjectImages } from "@/hooks/queries/use-projects";
import { cn } from "@/lib/utils";
import { projectsQueries } from "@/queries/projects";

import SortableItem from "./sortable-item";
import SortableRootList from "./sortable-root-list";

interface SortableProjectImagesProps {
  projectId: string;
}

const SortableProjectImages = ({ projectId }: SortableProjectImagesProps) => {
  const { data: images } = useProjectImages(projectId);
  const updateOrderMutation = useUpdateProjectImagesOrder();
  const [isSorting, setIsSorting] = useState(false);
  const queryClient = useQueryClient();

  const cancelSorting = () => {
    setIsSorting(false);
    queryClient.invalidateQueries({
      queryKey: projectsQueries.keys.images(projectId),
    });
  };

  const saveSorting = () =>
    updateOrderMutation.mutate(images, {
      onSuccess: () => {
        toast.success("Ordem das imagens atualizada com sucesso");
        setIsSorting(false);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao atualizar ordem das imagens"
        ),
    });

  if (images.length < 2) return;

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setIsSorting(true)}>
        <ArrowDownUp />
        Editar ordem
      </Button>
      <Dialog open={isSorting}>
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
                    disabled={!isSorting}
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
              onClick={cancelSorting}
              variant={"destructive"}
              className="flex-1"
              disabled={updateOrderMutation.isPending}
            >
              Cancelar edição
            </Button>
            <Button
              className="w-1/2"
              disabled={updateOrderMutation.isPending}
              onClick={saveSorting}
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
