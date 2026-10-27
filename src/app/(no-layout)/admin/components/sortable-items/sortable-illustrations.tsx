"use client";

import { useUpdateIllustrationsOrder } from "@/hooks/mutations/use-update-illustrations-order";
import { useVisibleIllustrations } from "@/hooks/queries/use-illustrations";
import { illustrationsQueries } from "@/queries/illustrations";

import SortableImagesDialog from "./sortable-images-dialog";

const SortableIllustrations = () => {
  const { data: illustrations } = useVisibleIllustrations();
  const updateIllustrationsOrderMutation = useUpdateIllustrationsOrder();
  const sortableIllustrations = illustrations.map((illustration) => ({
    id: illustration.id,
    title: illustration.image?.title || "",
    imageUrl: illustration.image?.imageUrl || "",
    horizontalPage: illustration.horizontalIllustration,
  }));

  return (
    <SortableImagesDialog
      items={sortableIllustrations}
      queryKey={illustrationsQueries.keys.visible()}
      title="Ordem das ilustrações"
      description="Arraste as imagens para definir a ordem na página Ilustrações."
      onSave={() => updateIllustrationsOrderMutation.mutateAsync(illustrations)}
      isSaving={updateIllustrationsOrderMutation.isPending}
      successMessage="Ordem das ilustrações atualizada com sucesso"
      errorMessage="Erro ao atualizar ordem das ilustrações"
      triggerClassName="absolute top-0 left-0 translate-x-10 translate-y-4"
    />
  );
};

export default SortableIllustrations;
