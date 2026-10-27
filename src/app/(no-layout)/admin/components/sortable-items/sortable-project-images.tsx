"use client";

import { useUpdateProjectImagesOrder } from "@/hooks/mutations/use-update-project-images-order";
import { useProjectImages } from "@/hooks/queries/use-projects";
import { projectsQueries } from "@/queries/projects";

import SortableImagesDialog from "./sortable-images-dialog";

interface SortableProjectImagesProps {
  projectId: string;
}

const SortableProjectImages = ({ projectId }: SortableProjectImagesProps) => {
  const { data: images } = useProjectImages(projectId);
  const updateOrderMutation = useUpdateProjectImagesOrder();
  const sortableImages = images.map((image) => ({
    ...image,
    hidden: !image.visibleInProject,
  }));

  return (
    <SortableImagesDialog
      items={sortableImages}
      queryKey={projectsQueries.keys.images(projectId)}
      title="Ordem das imagens"
      description="Arraste as imagens. A primeira visível vira a capa."
      onSave={() => updateOrderMutation.mutateAsync(images)}
      isSaving={updateOrderMutation.isPending}
      successMessage="Ordem das imagens atualizada com sucesso"
      errorMessage="Erro ao atualizar ordem das imagens"
    />
  );
};

export default SortableProjectImages;
