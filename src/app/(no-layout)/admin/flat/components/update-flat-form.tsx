"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import { ImageDTO } from "@/app/data/image/image-dto";
import {
  UpdateFlatDTO,
  updateFlatSchema,
} from "@/app/data/schemas/update-flat-schema";
import { Button } from "@/components/ui/button";
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

import CadastreImageModal from "../../components/cadastre-image-modal";
import { SelectImageDialog } from "../../components/select-image-dialog";

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

  const [formIsEditable, setFormIsEditable] = useQueryState(
    "formIsEditable",
    parseAsBoolean.withDefault(false)
  );
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

  const { data: frontImage } = useImage(
    formUpdateFlat.watch("frontImageId"),
    currentFlat.frontImage ? { initialData: currentFlat.frontImage } : undefined
  );
  const { data: backImage } = useImage(
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
                <FormItem className="flex w-full h-72 md:h-full flex-col">
                  <FormLabel>Imagem da Line</FormLabel>

                  <div className="flex-1 relative mb-2">
                    <Image
                      src={frontImage?.imageUrl || ""}
                      alt="Selected image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {formIsEditable && (
                    <>
                      <CadastreImageModal
                        initialData={
                          backImage && {
                            artist: backImage.artist,
                            screenwriter: backImage.screenwriter,
                            colorist: backImage.colorist,
                            horizontalPage: backImage.horizontalPage,
                          }
                        }
                        saveImageId={(imageId) => {
                          formUpdateFlat.setValue("frontImageId", imageId);
                        }}
                        disabled={!formIsEditable}
                        textToTrigger="Alterar com nova Imagem"
                      />

                      <SelectImageDialog
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          formUpdateFlat.setValue("frontImageId", image.id);
                        }}
                        trigger={
                          <Button variant="outline" disabled={!formIsEditable}>
                            Selecionar outra imagem para Line
                          </Button>
                        }
                      />
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formUpdateFlat.control}
              name="backImageId"
              render={() => (
                <FormItem className="flex flex-col h-72 md:h-full">
                  <FormLabel>Imagem do Flat</FormLabel>

                  <div className="flex-1 relative mb-2">
                    <Image
                      src={backImage?.imageUrl || ""}
                      alt="Selected image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {formIsEditable && (
                    <>
                      <CadastreImageModal
                        initialData={
                          frontImage && {
                            artist: frontImage.artist,
                            screenwriter: frontImage.screenwriter,
                            colorist: frontImage.colorist,
                            horizontalPage: frontImage.horizontalPage,
                          }
                        }
                        saveImageId={(imageId) => {
                          formUpdateFlat.setValue("backImageId", imageId);
                        }}
                        disabled={!formIsEditable}
                        textToTrigger="Alterar com nova Imagem"
                      />

                      <SelectImageDialog
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          formUpdateFlat.setValue("backImageId", image.id);
                        }}
                        trigger={
                          <Button variant="outline" disabled={!formIsEditable}>
                            Selecionar outra imagem para Flat
                          </Button>
                        }
                      />
                    </>
                  )}

                  <FormMessage />
                </FormItem>
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

          <div className="flex w-full gap-4 justify-between">
            <Button
              type="button"
              onClick={() =>
                setFormIsEditable((old) => {
                  const newValue = !old;
                  if (newValue === false) {
                    formUpdateFlat.reset(formDefaultValues);
                  }
                  return newValue;
                })
              }
              variant={formIsEditable ? "destructive" : "default"}
              className={`${!formIsEditable ? "flex-1" : "flex-1/2"}`}
            >
              {formIsEditable ? "Cancelar edição" : "Habilitar edição"}
            </Button>
            {formIsEditable && (
              <Button
                type="submit"
                className="flex-1/2"
                disabled={updateFlatMutation.isPending}
              >
                Atualizar Flat
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateFlatForm;
