"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateComicsOrder } from "@/hooks/mutations/use-update-comics-order";
import {
  getComicsVisibleQueryKey,
  useComicsVisible,
} from "@/hooks/queries/use-comics-visible";

import SortableItem from "./sortable-item";
import SortableRootList, {
  getSortingIsDisabledQueryStateParams,
} from "./sortable-root-list";

interface SortableComicsProps {
  initialData?: Array<ComicDTO>;
}

const SortableComics = ({ initialData }: SortableComicsProps) => {
  const { data: comics = [] } = useComicsVisible(
    initialData && { initialData }
  );
  const updateComicsOrderMutation = useUpdateComicsOrder();
  const [sortingIsDisabled, setSortingIsDisabled] = useQueryState(
    ...getSortingIsDisabledQueryStateParams()
  );
  const queryClient = useQueryClient();
  const sortableComics = comics.map((comic) => ({
    id: comic.id,
    title: comic.image?.title || "",
    imageUrl: comic.image?.imageUrl || "",
  }));

  const toggleSortingState = () => {
    setSortingIsDisabled((prev) => !prev);
    if (!sortingIsDisabled) {
      queryClient.invalidateQueries({
        queryKey: getComicsVisibleQueryKey(),
      });
    }
  };

  if(!comics || comics.length === 0) return

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
            items={sortableComics}
            getQueryKeyFunction={getComicsVisibleQueryKey}
            className={`max-w-full ${sortingIsDisabled && "hidden"} `}
          >
            <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
              {sortableComics.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  disabled={sortingIsDisabled}
                  className="w-full aspect-auto"
                />
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
              disabled={updateComicsOrderMutation.isPending}
              onClick={async () => {
                await updateComicsOrderMutation.mutateAsync(
                  comics as unknown as ComicDTO[]
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

export default SortableComics;
