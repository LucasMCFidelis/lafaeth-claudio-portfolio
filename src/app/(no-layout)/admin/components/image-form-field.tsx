"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { imagesQueries } from "@/queries/images";

import CadastreImageModal, {
  ImageRegistrationDefaults,
} from "./cadastre-image-modal";
import { SelectImageDialog } from "./select-image-dialog";

interface ImageFormFieldProps {
  label: string;
  image?: ImageDTO | null;
  /**
   * Called with the image picked or registered through THIS field only; the
   * caller writes it into the form field this component represents.
   */
  onSelectImage: (id: string, image: ImageDTO) => void;
  /** Pre-fills the "register image" modal when it opens. */
  getRegistrationDefaults?: () => ImageRegistrationDefaults | undefined;
  disabled?: boolean;

  triggerTextToSelect?: string;
  className?: string;
}

export function ImageFormField({
  label,
  image,
  onSelectImage,
  getRegistrationDefaults,
  disabled,
  triggerTextToSelect,
  className,
}: ImageFormFieldProps) {
  const queryClient = useQueryClient();

  function handleImage(selected: ImageDTO) {
    // The form loads the preview by id; seeding the cache shows it right away.
    queryClient.setQueryData(imagesQueries.keys.detail(selected.id), selected);
    onSelectImage(selected.id, selected);
  }

  return (
    <FormItem className={cn("flex flex-col h-72", className)}>
      <FormLabel>{label}</FormLabel>

      <div className="flex-1 relative mb-2 bg-accent rounded-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt="Selected image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-top rounded-lg"
          />
        )}
      </div>

      {!disabled && (
        <div className="w-full grid gap-4">
          <CadastreImageModal
            getInitialData={getRegistrationDefaults}
            onImageCreated={handleImage}
            textToTrigger={image ? "Cadastrar outra imagem" : undefined}
            disabled={disabled}
          />
          <SelectImageDialog
            onSelect={handleImage}
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
