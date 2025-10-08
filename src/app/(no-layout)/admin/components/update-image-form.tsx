"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  UpdateImageDTO,
  updateImageSchema,
} from "@/app/data/schemas/update-image-schema";
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
import { useUpdateImage } from "@/hooks/mutations/use-update-image";

interface UpdateImageFormProps {
  initialData: ImageDTO;
}

const UpdateImageForm = ({ initialData }: UpdateImageFormProps) => {
  const formDefaultValues: UpdateImageDTO = {
    id: initialData.id,
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    imageUrl: initialData.imageUrl ?? "",
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

  const [formIsEditable, setFormIsEditable] = useQueryState(
    "formIsEditable",
    parseAsBoolean.withDefault(false)
  );
  const updateImageMutation = useUpdateImage(formDefaultValues.id);

  async function onSubmit(data: UpdateImageDTO) {
    updateImageMutation.mutate(data);
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
                  <FormLabel>Url da Imagem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira a url"
                      {...field}
                      disabled={!formIsEditable}
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

          <Button
            type="button"
            onClick={() =>
              setFormIsEditable((old) => {
                const newValue = !old;
                if (newValue === false) {
                  formUpdateImage.reset(formDefaultValues);
                }
                return newValue;
              })
            }
            variant={formIsEditable ? "destructive" : "default"}
            className={`${!formIsEditable && "col-span-full"}`}
          >
            {formIsEditable ? "Cancelar edição" : "Habilitar edição"}
          </Button>
          {formIsEditable && (
            <Button type="submit" disabled={updateImageMutation.isPending}>
              Atualizar
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UpdateImageForm;
