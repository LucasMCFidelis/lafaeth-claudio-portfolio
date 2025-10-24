"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { ImageDTO } from "@/app/data/image/image-dto";
import {
  UpdateFlatDTO,
  updateFlatSchema,
} from "@/app/data/schemas/update-flat-schema";
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
import { useUpdateFlat } from "@/hooks/mutations/use-update-flat";
import { getFlatQueryKey, useFlat } from "@/hooks/queries/use-flat";
import { getFlatsVisibleQueryKey } from "@/hooks/queries/use-flats-visible";
import { useImage } from "@/hooks/queries/use-image";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "../../components/actions-update-forms";
import { ImageFormField } from "../../components/image-form-field";

interface UpdateFlatFormProps {
  imagesToSelect?: Array<ImageDTO>;
  initialData: FlatDTO<true>;
}

const UpdateFlatForm = ({
  imagesToSelect,
  initialData,
}: UpdateFlatFormProps) => {
  const { data: currentFlat } = useFlat(initialData.id, { initialData });
  if (!currentFlat) throw new Error(`Flat ${initialData.id} not found`);

  const [formIsEditable, setFormIsEditable] = useFormIsEditable();
  const updateFlatMutation = useUpdateFlat(currentFlat.id);
  const queryClient = useQueryClient();

  const formDefaultValues = {
    id: initialData.id,
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    frontImageId: initialData.frontImageId ?? "",
    backImageId: initialData.backImageId ?? "",
    visibleInFlat: initialData.visibleInFlat ?? false,
  };

  const formUpdateFlat = useForm<UpdateFlatDTO>({
    resolver: zodResolver(updateFlatSchema),
    defaultValues: formDefaultValues,
  });

  const { data: frontImage, refetch: refetchFront } = useImage(
    formUpdateFlat.watch("frontImageId"),
    currentFlat.frontImage ? { initialData: currentFlat.frontImage } : undefined
  );
  const { data: backImage, refetch: refetchBack } = useImage(
    formUpdateFlat.watch("backImageId"),
    currentFlat.backImage ? { initialData: currentFlat.backImage } : undefined
  );

  function onSubmit(data: UpdateFlatDTO) {
    updateFlatMutation.mutate(data, {
      onSuccess: (flatUpdated) => {
        if (flatUpdated.visibleInFlat != formDefaultValues.visibleInFlat) {
          queryClient.invalidateQueries({
            queryKey: getFlatsVisibleQueryKey(),
          });
        }
        queryClient.setQueryData<FlatDTO>(
          getFlatQueryKey(data.id),
          flatUpdated
        );
      },
    });
    setFormIsEditable(false);
  }

  return (
    <>
      <Form {...formUpdateFlat}>
        <form
          onSubmit={formUpdateFlat.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-6 mt-12"
        >
          <div className="grid md:grid-cols-2 gap-4 flex-1 w-full">
            <FormField
              control={formUpdateFlat.control}
              name="frontImageId"
              render={() => (
                <ImageFormField
                  label="Imagem da Line"
                  image={frontImage}
                  relatedImage={backImage}
                  disabled={!formIsEditable}
                  onSelectImage={(id) => {
                    formUpdateFlat.setValue("frontImageId", id);
                    refetchFront();
                  }}
                  imagesToSelect={imagesToSelect}
                  triggerTextToSelect="Selecionar outra imagem para Line"
                />
              )}
            />
            <FormField
              control={formUpdateFlat.control}
              name="backImageId"
              render={() => (
                <ImageFormField
                  label="Imagem do Flat"
                  image={backImage}
                  relatedImage={frontImage}
                  disabled={!formIsEditable}
                  onSelectImage={(id) => {
                    formUpdateFlat.setValue("backImageId", id);
                    refetchBack();
                  }}
                  imagesToSelect={imagesToSelect}
                  triggerTextToSelect="Selecionar outra imagem para Flat"
                />
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={formUpdateFlat.control}
              name="visibleInFlat"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!formIsEditable}
                    />
                  </FormControl>
                  <FormLabel>Exibir na página de flats</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formUpdateFlat.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira um titulo"
                      disabled={!formIsEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formUpdateFlat.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insira a descrição"
                      className=" resize-none"
                      disabled={!formIsEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ActionsUpdateForm
            textSaveUpdateAction="Atualizar Flat"
            disableSaveUpdateAction={updateFlatMutation.isPending}
            resetForm={() => formUpdateFlat.reset(formDefaultValues)}
          />
        </form>
      </Form>
    </>
  );
};

export default UpdateFlatForm;
