"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsBoolean, useQueryStates } from "nuqs";
import { useEffect } from "react";

import { ImageDTO } from "@/app/data/image/image-dto";
import ContainerImageHome from "@/components/common/image-home/container-image-home";
import ImageHome from "@/components/common/image-home/image-home";
import { Button } from "@/components/ui/button";
import { useUpdateHomeImagesOrder } from "@/hooks/mutations/use-update-home-images-order";
import {
  getHomeImagesQueryKey,
  useHomeImages,
} from "@/hooks/queries/use-home-images";

interface SortableImageProps {
  image: ImageDTO;
  disabled?: boolean;
}

const SortableImage = ({ image, disabled }: SortableImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ContainerImageHome
      imageId={image.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!disabled ? listeners : {})}
      className="cursor-move"
    >
      <ImageHome src={image.imageUrl} alt={image.title} />
    </ContainerImageHome>
  );
};

interface ImageListProps {
  initialData: Array<ImageDTO>;
}

export default function ImageList({ initialData }: ImageListProps) {
  const queryClient = useQueryClient();
  const { data: images = [] } = useHomeImages({ initialData });
  const updateHomeImagesOrderMutation = useUpdateHomeImagesOrder();
  const [imageListStates, setImageListStates] = useQueryStates({
    mounted: parseAsBoolean.withDefault(false),
    sortingIsDisabled: parseAsBoolean.withDefault(true),
  });

  useEffect(() => {
    setImageListStates({ mounted: true });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      queryClient.setQueryData<Array<ImageDTO>>(
        getHomeImagesQueryKey(),
        (items) => {
          if (!items) return;
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over!.id);
          return arrayMove(items, oldIndex, newIndex);
        }
      );
    }
  };

  if (!imageListStates.mounted) return null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <div className="w-full max-w-screen overflow-hidden grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <SortableImage
                key={img.id}
                image={img}
                disabled={imageListStates.sortingIsDisabled}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full grid gap-4 sm:grid-cols-2">
        <Button
          onClick={() => {
            setImageListStates((prev) => {
              return { sortingIsDisabled: !prev.sortingIsDisabled };
            });
          }}
          variant={
            imageListStates.sortingIsDisabled ? "default" : "destructive"
          }
          className={`w-full ${
            imageListStates.sortingIsDisabled && "col-span-2"
          }`}
        >
          {imageListStates.sortingIsDisabled ? (
            <>Habilitar edição de imagens da Home</>
          ) : (
            <>Cancelar edição</>
          )}
        </Button>
        {imageListStates.sortingIsDisabled === false && (
          <Button
            className="w-full"
            disabled={updateHomeImagesOrderMutation.isPending}
            onClick={async () => {
              await updateHomeImagesOrderMutation.mutateAsync(images);
              setImageListStates({ sortingIsDisabled: true });
            }}
          >
            Salvar Ordenação
          </Button>
        )}
      </div>
    </>
  );
}
