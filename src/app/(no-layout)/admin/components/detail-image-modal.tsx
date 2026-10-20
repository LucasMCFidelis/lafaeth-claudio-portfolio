"use client";

import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImage } from "@/hooks/queries/use-images";

import DeleteImageButton from "./delete-image-button";
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
          {image && (
            <>
              <UpdateImageForm initialData={image} />
              <div className="w-full max-w-sm self-end px-5">
                <DeleteImageButton
                  imageId={image.id}
                  onDeleted={() =>
                    setDetailStates({ imageId: null, openDetailImage: false })
                  }
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailImageModal;
