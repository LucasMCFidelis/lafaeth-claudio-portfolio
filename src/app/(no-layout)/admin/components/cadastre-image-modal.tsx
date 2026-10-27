"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  CadastreImageDTO,
  cadastreImageSchema,
} from "@/app/data/schemas/cadastre-image-schema";
import ContainerImageHome from "@/components/common/image-home/container-image-home";
import ImageHome from "@/components/common/image-home/image-home";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { usePostHomeImage } from "@/hooks/mutations/use-post-home-image";

import { ImageUploadInput } from "./image-upload-input";

/** Text fields the modal can start with (e.g. copied from a related image). */
export type ImageRegistrationDefaults = Partial<
  Pick<
    CadastreImageDTO,
    | "title"
    | "description"
    | "artist"
    | "screenwriter"
    | "colorist"
    | "horizontalPage"
  >
>;

const emptyValues: CadastreImageDTO = {
  title: "",
  description: "",
  imageUrl: "",
  originalUrl: null,
  visibleInHome: false,
  artist: "",
  screenwriter: "",
  colorist: "",
  horizontalPage: false,
};

interface CadastreImageModalProps {
  textToTrigger?: string;
  /**
   * Read when the modal opens, so it reflects the current state of the form
   * that owns the modal. Empty values are ignored.
   */
  getInitialData?: () => ImageRegistrationDefaults | undefined;
  /** Receives the image created by this modal instance. */
  onImageCreated?: (image: ImageDTO) => void;
  disabled?: boolean;
}

const CadastreImageModal = ({
  textToTrigger,
  getInitialData,
  onImageCreated,
  disabled,
}: CadastreImageModalProps) => {
  // Local state: each instance opens on its own. A shared URL param made every
  // modal on the page open together, and the last one got the new image.
  const [isOpen, setIsOpen] = useState(false);
  const postHomeImageMutation = usePostHomeImage();
  const [isUploading, setIsUploading] = useState(false);

  const formCadastreImage = useForm<CadastreImageDTO>({
    resolver: zodResolver(cadastreImageSchema),
    defaultValues: emptyValues,
  });

  function handleOpenChange(open: boolean) {
    if (open) {
      const initialData = Object.fromEntries(
        Object.entries(getInitialData?.() ?? {}).filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      formCadastreImage.reset({ ...emptyValues, ...initialData });
    }
    setIsOpen(open);
  }

  function onSubmit(data: CadastreImageDTO) {
    postHomeImageMutation.mutate(data, {
      onSuccess: (newImage) => {
        toast.success("Imagem cadastrada com sucesso");
        setIsOpen(false);
        onImageCreated?.(newImage);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao cadastrar imagem"
        ),
    });
  }

  const valueImageUrl = formCadastreImage.watch("imageUrl");

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="w-full" disabled={disabled}>
            {textToTrigger ? textToTrigger : "Adicionar imagem"}
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Cadastro de imagem</DialogTitle>
            <DialogDescription className="hidden md:block">
              Preencha os todos os campos abaixo, você pode definir a ordem da
              imagem na galeria
            </DialogDescription>
          </DialogHeader>
          <Form {...formCadastreImage}>
            <form
              onSubmit={formCadastreImage.handleSubmit(onSubmit)}
              className="grid sm:grid-cols-2 gap-4"
            >
              {valueImageUrl && (
                <ContainerImageHome
                  imageId=""
                  disableLink={true}
                  className="size-22 sm:size-32 md:size-48 mx-auto"
                >
                  <ImageHome
                    src={valueImageUrl}
                    alt="Imagem que será salva"
                    sizes="(max-width: 640px) 88px, (max-width: 768px) 128px, 192px"
                  />
                </ContainerImageHome>
              )}
              <FormField
                control={formCadastreImage.control}
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
                            formCadastreImage.setValue("originalUrl", originalUrl);
                          }}
                          folder="images"
                          onUploadingChange={setIsUploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira um titulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="row-span-2 flex flex-col row-start-4">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Insira a descrição"
                        className=" resize-none flex-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artista</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o artista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="screenwriter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roteirista</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o roteirista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="colorist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colorista</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o colorista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={`flex justify-between gap-2 ${
                  !valueImageUrl
                    ? "sm:col-start-1 col-span-full"
                    : "sm:col-start-2 sm:flex-col sm:justify-center"
                } sm:row-start-1`}
              >
                <FormField
                  control={formCadastreImage.control}
                  name="visibleInHome"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Exibir na home</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formCadastreImage.control}
                  name="horizontalPage"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Página horizontal</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full col-span-full"
                disabled={postHomeImageMutation.isPending || isUploading}
              >
                Cadastrar Imagem
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CadastreImageModal;
