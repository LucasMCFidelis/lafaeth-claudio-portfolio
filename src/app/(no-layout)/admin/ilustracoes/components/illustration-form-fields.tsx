"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { CadastreIllustrationDTO } from "@/app/data/schemas/cadastre-illustration-schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useImage } from "@/hooks/queries/use-images";

import { ImageFormField } from "../../components/image-form-field";

interface IllustrationFormFieldsProps {
  disabled?: boolean;
  /**
   * Copies the selected image's horizontalPage into the orientation switch
   * whenever a new image is picked (create form). It can still be changed
   * afterwards without touching the image.
   */
  followImageOrientation?: boolean;
  /** Buttons rendered under the fields (save, cancel, delete). */
  children: React.ReactNode;
}

/** Fields shared by the illustration create and edit forms. */
const IllustrationFormFields = ({
  disabled,
  followImageOrientation,
  children,
}: IllustrationFormFieldsProps) => {
  const form = useFormContext<CadastreIllustrationDTO>();
  const { data: image } = useImage(form.watch("imageId"));

  // Only when the image changes, so a manual toggle is kept on refetch.
  const syncedImageId = useRef<string | null>(null);
  useEffect(() => {
    if (!followImageOrientation || !image) return;
    if (syncedImageId.current === image.id) return;
    syncedImageId.current = image.id;
    form.setValue("horizontalIllustration", image.horizontalPage);
  }, [followImageOrientation, image, form]);

  return (
    <div className="w-full h-full flex flex-wrap gap-4 mt-12">
      <FormField
        control={form.control}
        name="imageId"
        render={() => (
          <ImageFormField
            label="Imagem da ilustração"
            image={image}
            disabled={disabled}
            onSelectImage={(imageId) =>
              form.setValue("imageId", imageId, { shouldDirty: true })
            }
            className="flex-1 md:h-full"
          />
        )}
      />
      <div className="space-y-4 w-full md:w-1/2 md:max-w-sm">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte um pouco sobre a ilustração"
                  className="md:min-h-24"
                  disabled={disabled}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="redirectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.instagram.com/p/..."
                  disabled={disabled}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horizontalIllustration"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <FormLabel>Ilustração horizontal (ocupa 2 colunas)</FormLabel>
              </div>
              {image && (
                <FormDescription>
                  A imagem está marcada como{" "}
                  {image.horizontalPage ? "horizontal" : "vertical"}. Alterar
                  aqui não muda a imagem.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visibleInIllustrations"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormLabel>Exibir na página de ilustrações</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </div>
    </div>
  );
};

export default IllustrationFormFields;
