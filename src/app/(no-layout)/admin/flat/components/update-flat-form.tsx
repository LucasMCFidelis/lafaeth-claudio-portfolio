"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
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
  const [updateFlatStates, setUpdateFlatStates] = useQueryStates({
    formIsEditable: parseAsBoolean.withDefault(false),
    frontImageId: parseAsString.withDefault(initialData.frontImageId!),
    backImageId: parseAsString.withDefault(initialData.backImageId!),
  });
  const { data: frontImage } = useImage(
    updateFlatStates.frontImageId,
    initialData.frontImage ? { initialData: initialData.frontImage } : undefined
  );
  const { data: backImage } = useImage(
    updateFlatStates.backImageId,
    initialData.backImage ? { initialData: initialData.backImage } : undefined
  );

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

  function onSubmit(data: UpdateFlatDTO) {
    console.log(data);
    setUpdateFlatStates({
      frontImageId: null,
      backImageId: null,
    });
    formUpdateFlat.reset();
  }

  return (
    <>
      <Form {...formUpdateFlat}>
        <form
          onSubmit={formUpdateFlat.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-6 mt-12"
        >
          <div className="grid md:grid-cols-2 gap-4 flex-1 col-span-full w-full">
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

                  {updateFlatStates.formIsEditable && (
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
                        saveIdQuery={(imageId) => {
                          setUpdateFlatStates({ frontImageId: imageId });
                          formUpdateFlat.setValue("frontImageId", imageId);
                        }}
                        disabled={!updateFlatStates.formIsEditable}
                        textToTrigger="Alterar com nova Imagem"
                      />

                      <SelectImageDialog
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          setUpdateFlatStates({ frontImageId: image.id });
                          formUpdateFlat.setValue("frontImageId", image.id);
                        }}
                        trigger={
                          <Button
                            variant="outline"
                            disabled={!updateFlatStates.formIsEditable}
                          >
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

                  {updateFlatStates.formIsEditable && (
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
                        saveIdQuery={(imageId) => {
                          setUpdateFlatStates({ backImageId: imageId });
                          formUpdateFlat.setValue("backImageId", imageId);
                        }}
                        disabled={!updateFlatStates.formIsEditable}
                        textToTrigger="Alterar com nova Imagem"
                      />

                      <SelectImageDialog
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          setUpdateFlatStates({ backImageId: image.id });
                          formUpdateFlat.setValue("backImageId", image.id);
                        }}
                        trigger={
                          <Button
                            variant="outline"
                            disabled={!updateFlatStates.formIsEditable}
                          >
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
                      disabled={!updateFlatStates.formIsEditable}
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
                      disabled={!updateFlatStates.formIsEditable}
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
                      disabled={!updateFlatStates.formIsEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="button"
            onClick={() =>
              setUpdateFlatStates((oldValues) => {
                const newValue = !oldValues.formIsEditable;
                if (newValue === false) {
                  formUpdateFlat.reset(formDefaultValues);
                }
                return { formIsEditable: newValue };
              })
            }
            variant={
              updateFlatStates.formIsEditable ? "destructive" : "default"
            }
            className={`${!updateFlatStates.formIsEditable && "col-span-full"}`}
          >
            {updateFlatStates.formIsEditable
              ? "Cancelar edição"
              : "Habilitar edição"}
          </Button>
          {updateFlatStates.formIsEditable && (
            <Button type="submit" className="w-full col-span-full">
              Atualizar Flat
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default UpdateFlatForm;
