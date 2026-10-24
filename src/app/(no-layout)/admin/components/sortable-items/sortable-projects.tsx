"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProjectsOrder } from "@/hooks/mutations/use-update-projects-order";
import { useVisibleProjects } from "@/hooks/queries/use-projects";
import { projectsQueries } from "@/queries/projects";

import SortableItem from "./sortable-item";
import SortableRootList from "./sortable-root-list";

const SortableProjects = () => {
  const { data: projects } = useVisibleProjects();
  const updateProjectsOrderMutation = useUpdateProjectsOrder();
  const [isSorting, setIsSorting] = useState(false);
  const queryClient = useQueryClient();
  const sortableProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    imageUrl: project.cover?.imageUrl ?? "",
  }));

  const cancelSorting = () => {
    setIsSorting(false);
    queryClient.invalidateQueries({
      queryKey: projectsQueries.keys.visible(),
    });
  };

  const saveSorting = () =>
    updateProjectsOrderMutation.mutate(projects, {
      onSuccess: () => {
        toast.success("Ordem dos projetos atualizada com sucesso");
        setIsSorting(false);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao atualizar ordem dos projetos"
        ),
    });

  if (projects.length === 0) return;

  return (
    <>
      <Button
        onClick={() => setIsSorting(true)}
        className="absolute top-0 left-0 translate-x-10 translate-y-4"
      >
        Editar ordem
      </Button>
      <Dialog open={isSorting}>
        <DialogContent
          className="md:max-w-full h-full flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>Disposição na página</DialogTitle>
          </DialogHeader>
          <SortableRootList
            items={sortableProjects}
            getQueryKeyFunction={projectsQueries.keys.visible}
            className="max-w-full overflow-y-auto"
          >
            <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortableProjects.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-square border-2 shadow-md rounded-xl bg-accent"
                >
                  <SortableItem
                    item={item}
                    disabled={!isSorting}
                    className="size-full aspect-auto"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-background/80 px-2 py-1 text-center text-sm pointer-events-none">
                    {item.title}
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
              disabled={updateProjectsOrderMutation.isPending}
            >
              Cancelar edição
            </Button>
            <Button
              className="w-1/2"
              disabled={updateProjectsOrderMutation.isPending}
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

export default SortableProjects;
