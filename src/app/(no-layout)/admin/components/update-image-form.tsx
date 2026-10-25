"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  UpdateImageDTO,
  updateImageSchema,
} from "@/app/data/schemas/update-image-schema";
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
import { useUpdateImage } from "@/hooks/mutations/use-update-image";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "./actions-update-forms";
import { ImageUploadInput } from "./image-upload-input";

interface UpdateImageFormProps {
  initialData: ImageDTO;
}

const UpdateImageForm = ({ initialData }: UpdateImageFormProps) => {
  const formDefaultValues: UpdateImageDTO = {
    id: initialData.id,
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    imageUrl: initialData.imageUrl ?? "",
    originalUrl: initialData.originalUrl,
    artist: initialData.artist ?? "",
    screenwriter: initialData.screenwriter ?? "",
    colorist: initialData.colorist ?? "",
    visibleInHome: initialData.visibleInHome ?? false,
    horizontalPage: initialData.horizontalPage ?? false,
  };
  const formUpdateImage = useForm<UpdateImageDTO>({
    resolver: zodResolver(updateImageSchema),
    defaultValues: formDefaultValues,
  });

  const [formIsEditable, setFormIsEditable] = useFormIsEditable();
  const updateImageMutation = useUpdateImage(formDefaultValues.id);
  const [isUploading, setIsUploading] = useState(false);

  async function onSubmit(data: UpdateImageDTO) {
    updateImageMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Imagem atualizada com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao atualizar imagem"
        ),
    });
    setFormIsEditable(false);
  }

  const valueImageUrl = formUpdateImage.watch("imageUrl");

  return (
    <div className="flex flex-col flex-1 p-5 w-full md:grid md:grid-cols-[1fr_35%] gap-5 md:gap-10">
      <div className="h-1/2 md:h-full relative">
        <Image
          src={valueImageUrl}
          alt={"teste"}
          fill
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-contain"
        />
      </div>

      <Form {...formUpdateImage}>
        <form
          onSubmit={formUpdateImage.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-4"
        >
          <FormField
            control={formUpdateImage.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="sm:col-span-2 sm:flex ">
                <div
                  className="flex-1 flex gap-2 flex-col justify-end
                    "
                >
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <ImageUploadInput
                      value={field.value}
                      onChange={({ imageUrl, originalUrl }) => {
                        field.onChange(imageUrl);
                        formUpdateImage.setValue("originalUrl", originalUrl);
                      }}
                      folder="images"
                      disabled={!formIsEditable}
                      onUploadingChange={setIsUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateImage.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira um titulo"
                    {...field}
                    disabled={!formIsEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateImage.control}
            name="description"
            render={({ field }) => (
              <FormItem className="row-span-2 flex flex-col row-start-4">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira a descrição"
                    className=" resize-none flex-1"
                    disabled={!formIsEditable}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateImage.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artista</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o artista"
                    {...field}
                    disabled={!formIsEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateImage.control}
            name="screenwriter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roteirista</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o roteirista"
                    {...field}
                    disabled={!formIsEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUpdateImage.control}
            name="colorist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colorista</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o colorista"
                    {...field}
                    disabled={!formIsEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={`flex justify-between gap-2 col-span-full sm:row-start-1`}
          >
            <FormField
              control={formUpdateImage.control}
              name="visibleInHome"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!formIsEditable}
                    />
                  </FormControl>
                  <FormLabel>Exibir na home</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formUpdateImage.control}
              name="horizontalPage"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!formIsEditable}
                    />
                  </FormControl>
                  <FormLabel>Página horizontal</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ActionsUpdateForm
            textSaveUpdateAction="Atualizar Imagem"
            disableSaveUpdateAction={updateImageMutation.isPending || isUploading}
            resetForm={() => formUpdateImage.reset(formDefaultValues)}
            className="col-span-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default UpdateImageForm;
