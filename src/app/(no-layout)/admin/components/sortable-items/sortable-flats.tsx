"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUpdateFlatsOrder } from "@/hooks/mutations/use-update-flats-order";
import { useVisibleFlats } from "@/hooks/queries/use-flats";
import { flatsQueries } from "@/queries/flats";

import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

const SortableFlats = () => {
  const { data: flats } = useVisibleFlats();
  const updateFlatsOrderMutation = useUpdateFlatsOrder();
  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );
  const queryClient = useQueryClient();
  const sortableFlats = flats.map((flat) => {
    return {
      id: flat.id,
      title: flat.title,
      imageUrl: flat.backImage?.imageUrl || flat.frontImage?.imageUrl || "",
    };
  });

  if (!flats || flats.length === 0) return;

  return (
    <div className="space-y-4">
      <div className="w-full grid gap-4">
        <Button
          onClick={() => {
            setSortingIsDisabled((prev) => !prev);
            if (!sortingIsDisabled) {
              queryClient.invalidateQueries({
                queryKey: flatsQueries.keys.visible(),
              });
            }
          }}
          variant={sortingIsDisabled ? "default" : "destructive"}
        >
          {sortingIsDisabled ? <>Habilitar Ordenação</> : <>Cancelar edição</>}
        </Button>
        {!sortingIsDisabled && (
          <Button
            className="w-full"
            disabled={updateFlatsOrderMutation.isPending}
            onClick={async () => {
              await updateFlatsOrderMutation.mutateAsync(flats, {
                onSuccess: () =>
                  toast.success("Ordem dos flats atualizado com sucesso"),
                onError: (error) =>
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Erro ao atualizar ordem dos flats"
                  ),
              });
              setSortingIsDisabled(true);
            }}
          >
            Salvar Ordenação
          </Button>
        )}
      </div>
      <SortableRootList
        items={sortableFlats}
        getQueryKeyFunction={flatsQueries.keys.visible}
        className={`max-w-full ${sortingIsDisabled && "hidden"} md:block`}
      >
        {sortableFlats.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            disabled={sortingIsDisabled}
            className="w-full"
          />
        ))}
      </SortableRootList>
    </div>
  );
};

export default SortableFlats;
