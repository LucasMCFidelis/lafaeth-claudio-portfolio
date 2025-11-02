"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import {
  UpdateColorDTO,
  updateColorSchema,
} from "@/app/data/schemas/update-color-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateColor } from "@/hooks/mutations/use-update-color";
import { useColor } from "@/hooks/queries/use-color";
import { getComicsVisibleQueryKey } from "@/hooks/queries/use-comics-visible";
import { useImage } from "@/hooks/queries/use-image";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "../../components/actions-update-forms";
import { ImageFormField } from "../../components/image-form-field";

interface UpdateColorFormProps {
  initialData: ColorDTO;
}

const UpdateColorForm = ({ initialData }: UpdateColorFormProps) => {
  const { data: currentColor } = useColor(initialData.id, { initialData });
  if (!currentColor)
    throw new Error(`Colorization ${initialData.id} not found`);
  const updateColorMutation = useUpdateColor(currentColor.id);
  const queryClient = useQueryClient();

  const [formIsEditable, setFormIsEditable] = useFormIsEditable();
  const formDefaultValues: UpdateColorDTO = {
    id: initialData.id,
    imageId: initialData.imageId ?? "",
    observations: initialData.observations ?? "",
    productionYear: initialData.productionYear,
    visibleInColorization: initialData.visibleInColors ?? false,
  };

  const formUpdateColor = useForm<UpdateColorDTO>({
    resolver: zodResolver(updateColorSchema),
    defaultValues: formDefaultValues,
  });

  const { data: image } = useImage(formUpdateColor.watch("imageId"));

  function onSubmit(data: UpdateColorDTO) {
    updateColorMutation.mutate(data, {
      onSuccess: (newColor) => {
        if (
          newColor.visibleInColors != formDefaultValues.visibleInColorization
        ) {
          queryClient.invalidateQueries({
            queryKey: getComicsVisibleQueryKey(),
          });
        }
        toast.success("Colorização atualizada com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao atualizar colorização"
        ),
    });
    setFormIsEditable(false);
  }

  return (
    <Form {...formUpdateColor}>
      <form
        onSubmit={formUpdateColor.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-wrap gap-4 mt-12"
      >
        <FormField
          control={formUpdateColor.control}
          name="imageId"
          render={() => (
            <ImageFormField
              label="Imagem da colorização"
              image={image}
              disabled={!formIsEditable || updateColorMutation.isPending}
              onSelectImage={(imageId) => {
                formUpdateColor.setValue("imageId", imageId);
              }}
              className="flex-1 md:h-full"
            />
          )}
        />
        <div className="space-y-4 w-full md:w-1/2 md:max-w-sm">
          <FormField
            control={formUpdateColor.control}
            name="productionYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de publicação</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o ano de publicação"
                    {...field}
                    type="number"
                    disabled={!formIsEditable || updateColorMutation.isPending}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateColor.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira alguma observação"
                    disabled={!formIsEditable || updateColorMutation.isPending}
                    className="md:min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateColor.control}
            name="visibleInColorization"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!formIsEditable || updateColorMutation.isPending}
                  />
                </FormControl>
                <FormLabel>Exibir na página de colorizações</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <ActionsUpdateForm
            textSaveUpdateAction="Atualizar Quadrinho"
            disableSaveUpdateAction={updateColorMutation.isPending}
            resetForm={() => formUpdateColor.reset(formDefaultValues)}
          />
        </div>
      </form>
    </Form>
  );
};

export default UpdateColorForm;
