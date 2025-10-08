"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { Button } from "@/components/ui/button";
import { useUpdateFlatsOrder } from "@/hooks/mutations/use-update-flats-order";
import {
  getFlatsVisibleQueryKey,
  useFlatsVisible,
} from "@/hooks/queries/use-flats-visible";

import SortableItem from "./sortable-item";
import SortableRootList, { getSortingIsDisabledQueryStateParams } from "./sortable-root-list";

interface SortableFlatsProps {
  initialData?: Array<FlatDTO>;
}

const SortableFlats = ({ initialData }: SortableFlatsProps) => {
  const { data: flats = [] } = useFlatsVisible(initialData && { initialData });
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

  return (
    <>
      <SortableRootList
        items={sortableFlats}
        getQueryKeyFunction={getFlatsVisibleQueryKey}
        className="max-w-full"
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
      <div className="w-full grid gap-4 md:grid-cols-2">
        <Button
          onClick={() => {
            setSortingIsDisabled((prev) => !prev);
            if (!sortingIsDisabled) {
              queryClient.invalidateQueries({
                queryKey: getFlatsVisibleQueryKey(),
              });
            }
          }}
          variant={sortingIsDisabled ? "default" : "destructive"}
          className={`w-full ${sortingIsDisabled && "md:col-span-full"}`}
        >
          {sortingIsDisabled ? (
            <>Habilitar edição de ordem</>
          ) : (
            <>Cancelar edição</>
          )}
        </Button>
        {!sortingIsDisabled && (
          <Button
            className="w-full"
            disabled={updateFlatsOrderMutation.isPending}
            onClick={async () => {
              await updateFlatsOrderMutation.mutateAsync(flats);
              setSortingIsDisabled(true);
            }}
          >
            Salvar Ordenação
          </Button>
        )}
      </div>
    </>
  );
};

export default SortableFlats;
