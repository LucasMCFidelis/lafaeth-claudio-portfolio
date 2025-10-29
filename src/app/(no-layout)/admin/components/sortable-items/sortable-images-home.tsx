"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import { useUpdateHomeImagesOrder } from "@/hooks/mutations/use-update-home-images-order";
import {
  getHomeImagesQueryKey,
  useHomeImages,
} from "@/hooks/queries/use-home-images";

import CadastreImageModal from "../cadastre-image-modal";
import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

interface SortableImagesHomeProps {
  initialData?: Array<ImageDTO>;
}

const SortableImagesHome = ({ initialData }: SortableImagesHomeProps) => {
  const { data: imagesHome = [] } = useHomeImages(
    initialData && { initialData }
  );
  const queryClient = useQueryClient();
  const updateHomeImagesOrderMutation = useUpdateHomeImagesOrder();

  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );

  if (!imagesHome || imagesHome.length === 0) return <CadastreImageModal />;

  return (
    <>
      <SortableRootList
        items={imagesHome}
        getQueryKeyFunction={getHomeImagesQueryKey}
        className="grid md:grid-cols-2 lg:grid-cols-3"
      >
        {imagesHome.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            disabled={sortingIsDisabled}
            className="size-auto"
          />
        ))}
      </SortableRootList>
      <div className="w-full grid gap-4 sm:grid-cols-2">
        <Button
          onClick={() => {
            setSortingIsDisabled((prev) => !prev);
            if (!sortingIsDisabled) {
              queryClient.invalidateQueries({
                queryKey: getHomeImagesQueryKey(),
              });
            }
          }}
          variant={sortingIsDisabled ? "default" : "destructive"}
          className="w-full"
        >
          {sortingIsDisabled ? (
            <>Habilitar edição de imagens da Home</>
          ) : (
            <>Cancelar edição</>
          )}
        </Button>
        {!sortingIsDisabled ? (
          <Button
            className="w-full"
            disabled={updateHomeImagesOrderMutation.isPending}
            onClick={async () => {
              await updateHomeImagesOrderMutation.mutateAsync(imagesHome, {
                onSuccess: () =>
                  toast.success(
                    "Ordem das images de inicio atualizada com sucesso"
                  ),
                onError: (error) =>
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Erro ao atualizar ordem das images de inicio"
                  ),
              });
              setSortingIsDisabled(true);
            }}
          >
            Salvar Ordenação
          </Button>
        ) : (
          <CadastreImageModal />
        )}
      </div>
    </>
  );
};

export default SortableImagesHome;
