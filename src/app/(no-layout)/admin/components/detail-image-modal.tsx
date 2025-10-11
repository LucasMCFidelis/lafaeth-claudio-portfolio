"use client";

import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImage } from "@/hooks/queries/use-image";

import UpdateImageForm from "./update-image-form";

interface DetailImageModalProps {
  imageId: string;
  initialData?: ImageDTO;
}

const DetailImageModal = ({ imageId, initialData }: DetailImageModalProps) => {
  const { data: image } = useImage(imageId, initialData && { initialData });

  const [{ openDetailImage }, setDetailStates] = useQueryStates({
    openDetailImage: parseAsBoolean.withDefault(false),
    imageId: parseAsString,
  });

  return (
    <>
      <Dialog
        open={openDetailImage}
        onOpenChange={(value) =>
          setDetailStates({ imageId: null, openDetailImage: value })
        }
      >
        <DialogContent className="md:max-w-full h-full flex flex-col">
          <DialogHeader>
            <DialogTitle>Detalhes da imagem</DialogTitle>
          </DialogHeader>
          {image && <UpdateImageForm initialData={image} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailImageModal;
