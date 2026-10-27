"use client";

import { useUpdateColorsOrder } from "@/hooks/mutations/use-update-colors-order";
import { useVisibleColors } from "@/hooks/queries/use-colors";
import { colorsQueries } from "@/queries/colors";

import SortableImagesDialog from "./sortable-images-dialog";

const SortableColors = () => {
  const { data: colors } = useVisibleColors();
  const updateColorsOrderMutation = useUpdateColorsOrder();
  const sortableColors = colors.map((color) => ({
    id: color.id,
    title: color.image?.title || "",
    imageUrl: color.image?.imageUrl || "",
    horizontalPage: color.image?.horizontalPage ?? false,
  }));

  return (
    <SortableImagesDialog
      items={sortableColors}
      queryKey={colorsQueries.keys.visible()}
      title="Ordem das colorizações"
      description="Arraste as imagens para definir a ordem na página Cores."
      onSave={() => updateColorsOrderMutation.mutateAsync(colors)}
      isSaving={updateColorsOrderMutation.isPending}
      successMessage="Ordem das colorizações atualizada com sucesso"
      errorMessage="Erro ao atualizar ordem das colorizações"
      triggerClassName="absolute top-0 left-0 translate-x-10 translate-y-4"
    />
  );
};

export default SortableColors;
