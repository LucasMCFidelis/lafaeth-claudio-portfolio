"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateIllustrationsOrder } from "@/hooks/mutations/use-update-illustrations-order";
import { getIllustrationsVisibleQueryKey, useIllustrationsVisible } from "@/hooks/queries/use-illustrations-visible";

import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

interface SortableIllustrationsProps {
  initialData?: Array<IllustrationDTO>;
}

const SortableIllustrations = ({ initialData }: SortableIllustrationsProps) => {
  const { data: illustrations = [] } = useIllustrationsVisible(
    initialData && { initialData }
  );
  const updateIllustrationOrderMutation = useUpdateIllustrationsOrder();
  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );
  const queryClient = useQueryClient();
  const sortableIllustrations = illustrations.map((illustration) => ({
    id: illustration.id,
    title: illustration.image?.title || "",
    imageUrl: illustration.image?.imageUrl || "",
    horizontalPage: illustration.horizontalIllustration ?? false,
  }));

  const toggleSortingState = () => {
    setSortingIsDisabled((prev) => !prev);
    if (!sortingIsDisabled) {
      queryClient.invalidateQueries({
        queryKey: getIllustrationsVisibleQueryKey(),
      });
    }
  };

  if (!illustrations || illustrations.length === 0) return;

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
            items={sortableIllustrations}
            getQueryKeyFunction={getIllustrationsVisibleQueryKey}
            className={`max-w-full ${sortingIsDisabled && "hidden"} `}
          >
            <div className="w-full flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
              {sortableIllustrations.map((item) => (
                <div
                  key={item.id}
                  className={`min-h-56 border-2 shadow-md rounded-xl ${
                    item.horizontalPage ? "md:col-span-2" : ""
                  }`}
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
              disabled={updateIllustrationOrderMutation.isPending}
              onClick={async () => {
                await updateIllustrationOrderMutation.mutateAsync(
                  illustrations as unknown as Array<IllustrationDTO>,
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

export default SortableIllustrations;
