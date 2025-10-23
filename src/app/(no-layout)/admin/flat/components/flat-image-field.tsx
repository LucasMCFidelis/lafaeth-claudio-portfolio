import Image from "next/image";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import CadastreImageModal from "../../components/cadastre-image-modal";
import { SelectImageDialog } from "../../components/select-image-dialog";

interface FlatImageFieldProps {
  label: string;
  image?: ImageDTO | null;
  relatedImage?: ImageDTO | null;
  onSelectImage: (id: string) => void;
  disabled?: boolean;
  imagesToSelect?: Array<ImageDTO>;
  triggerTextToSelect?: string;
}

export function FlatImageField({
  label,
  image,
  relatedImage,
  onSelectImage,
  disabled,
  imagesToSelect,
  triggerTextToSelect,
}: FlatImageFieldProps) {
  return (
    <FormItem className="flex flex-col h-72">
      <FormLabel>{label}</FormLabel>

      <div className="flex-1 relative mb-2 bg-accent rounded-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt="Selected image"
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>

      {!disabled && (
        <div className="w-full grid gap-4">
          <CadastreImageModal
            {...(relatedImage && {
              initialData: {
                artist: relatedImage.artist,
                screenwriter: relatedImage.screenwriter,
                colorist: relatedImage.colorist,
                horizontalPage: relatedImage.horizontalPage,
              },
            })}
            saveImageId={onSelectImage}
            textToTrigger={image ? "Cadastrar outra imagem" : undefined}
            disabled={disabled}
          />
          <SelectImageDialog
            imagesToSelect={imagesToSelect}
            onSelect={(img) => onSelectImage(img.id)}
            {...(triggerTextToSelect && {
              trigger: (
                <Button variant="outline" disabled={disabled}>
                  {triggerTextToSelect}
                </Button>
              ),
            })}
          />
        </div>
      )}

      <FormMessage />
    </FormItem>
  );
}
