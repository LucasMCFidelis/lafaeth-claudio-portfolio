"use client";

import { useFormContext } from "react-hook-form";

import { CadastreIllustrationDTO } from "@/app/data/schemas/cadastre-illustration-schema";
import {
  FormControl,
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
  /** Buttons rendered under the fields (save, cancel, delete). */
  children: React.ReactNode;
}

/** Fields shared by the illustration create and edit forms. */
const IllustrationFormFields = ({
  disabled,
  children,
}: IllustrationFormFieldsProps) => {
  const form = useFormContext<CadastreIllustrationDTO>();
  const { data: image } = useImage(form.watch("imageId"));

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
            <FormItem className="flex items-center">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormLabel>Ilustração horizontal (ocupa 2 colunas)</FormLabel>
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
