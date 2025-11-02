"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateColorsOrder } from "@/hooks/mutations/use-update-colors-order";
import {
  getColorsVisibleQueryKey,
  useColorsVisible,
} from "@/hooks/queries/use-colors-visible";

import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

interface SortableColorsProps {
  initialData?: Array<ColorDTO>;
}

const SortableColors = ({ initialData }: SortableColorsProps) => {
  const { data: colors = [] } = useColorsVisible(
    initialData && { initialData }
  );
  const updateColorsOrderMutation = useUpdateColorsOrder();
  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );
  const queryClient = useQueryClient();
  const sortableColors = colors.map((color) => ({
    id: color.id,
    title: color.image?.title || "",
    imageUrl: color.image?.imageUrl || "",
    horizontalPage: color.image?.horizontalPage ?? false,
  }));

  const toggleSortingState = () => {
    setSortingIsDisabled((prev) => !prev);
    if (!sortingIsDisabled) {
      queryClient.invalidateQueries({
        queryKey: getColorsVisibleQueryKey(),
      });
    }
  };

  if (!colors || colors.length === 0) return;

  return (
    <>
      <Button
        onClick={toggleSortingState}
        className="absolute top-0 left-0 translate-x-10 translate-y-4"
      >
        Editar ordem
      </Button>
      <Dialog open={!sortingIsDisabled}>
        <DialogContent
          className="md:max-w-full h-full flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>Disposição na página</DialogTitle>
          </DialogHeader>
          <SortableRootList
            items={sortableColors}
            getQueryKeyFunction={getColorsVisibleQueryKey}
            className={`max-w-full ${sortingIsDisabled && "hidden"} `}
          >
            <div className="w-full flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
              {sortableColors.map((item) => (
                <div
                  key={item.id}
                  className={`min-h-56 ${item.horizontalPage ? "md:col-span-2" : ""}`}
                >
                  <SortableItem
                    item={item}
                    disabled={sortingIsDisabled}
                    className="w-full h-full aspect-auto"
                  />
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
              disabled={updateColorsOrderMutation.isPending}
              onClick={async () => {
                await updateColorsOrderMutation.mutateAsync(
                  colors as unknown as Array<ColorDTO>,
                  {
                    onSuccess: () =>
                      toast.success(
                        "Ordem das colorizações atualizada com sucesso"
                      ),
                    onError: (error) =>
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Erro ao atualizar ordem das colorizações"
                      ),
                  }
                );
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

export default SortableColors;
