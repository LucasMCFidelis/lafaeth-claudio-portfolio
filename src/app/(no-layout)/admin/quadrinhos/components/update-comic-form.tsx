"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import {
  UpdateComicDTO,
  updateComicSchema,
} from "@/app/data/schemas/update-comic-schema";
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
import { useUpdateComic } from "@/hooks/mutations/use-update-comic";
import { useComic } from "@/hooks/queries/use-comic";
import { getComicsVisibleQueryKey } from "@/hooks/queries/use-comics-visible";
import { useImage } from "@/hooks/queries/use-image";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "../../components/actions-update-forms";
import { ImageFormField } from "../../components/image-form-field";

interface UpdateComicFormProps {
  initialData: ComicDTO;
}

const UpdateComicForm = ({ initialData }: UpdateComicFormProps) => {
  const { data: currentComic } = useComic(initialData.id, { initialData });
  if (!currentComic) throw new Error(`Comic ${initialData.id} not found`);
  const updateComicMutation = useUpdateComic(currentComic.id);
  const queryClient = useQueryClient();

  const [formIsEditable, setFormIsEditable] = useFormIsEditable();
  const formDefaultValues: UpdateComicDTO = {
    id: initialData.id,
    imageId: initialData.imageId ?? "",
    productionSizePages: initialData.productionSizePages,
    productionYear: initialData.productionYear,
    visibleInComics: initialData.visibleInComics ?? false,
  };
  const formUpdateComic = useForm<UpdateComicDTO>({
    resolver: zodResolver(updateComicSchema),
    defaultValues: formDefaultValues,
  });

  const { data: image } = useImage(formUpdateComic.watch("imageId"));

  function onSubmit(data: UpdateComicDTO) {
    updateComicMutation.mutate(data, {
      onSuccess: (newComic) => {
        if (newComic.visibleInComics != formDefaultValues.visibleInComics) {
          queryClient.invalidateQueries({
            queryKey: getComicsVisibleQueryKey(),
          });
        }
        toast.success("Quadrinho atualizado com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao atualizar quadrinho"
        ),
    });
    setFormIsEditable(false);
  }

  return (
    <>
      <Form {...formUpdateComic}>
        <form
          onSubmit={formUpdateComic.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-wrap gap-4 mt-12"
        >
          <FormField
            control={formUpdateComic.control}
            name="imageId"
            render={() => (
              <ImageFormField
                label="Imagem do quadrinho"
                image={image}
                disabled={!formIsEditable}
                onSelectImage={(imageId) => {
                  formUpdateComic.setValue("imageId", imageId);
                }}
                className="flex-1 md:h-full"
              />
            )}
          />

          <div className="space-y-4 w-full md:w-1/2 md:max-w-sm">
            <FormField
              control={formUpdateComic.control}
              name="productionSizePages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de páginas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o número de páginas"
                      {...field}
                      type="number"
                      disabled={!formIsEditable}
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
              control={formUpdateComic.control}
              name="productionYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano de publicação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o ano de publicação"
                      {...field}
                      type="number"
                      disabled={!formIsEditable}
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
              control={formUpdateComic.control}
              name="visibleInComics"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!formIsEditable}
                    />
                  </FormControl>
                  <FormLabel>Exibir na página de quadrinhos</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ActionsUpdateForm
              textSaveUpdateAction="Atualizar Quadrinho"
              disableSaveUpdateAction={updateComicMutation.isPending}
              resetForm={() => formUpdateComic.reset(formDefaultValues)}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateComicForm;
