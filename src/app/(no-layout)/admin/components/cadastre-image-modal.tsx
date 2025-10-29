"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
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
import { matchUrlDrive } from "@/helpers/match-url-drive";
import { usePostHomeImage } from "@/hooks/mutations/use-post-home-image";

interface CadastreImageModalProps {
  textToTrigger?: string;
  initialData?: Partial<ImageDTO>;
  saveImageId?: (imageId: string) => void;
  disabled?: boolean;
}

const CadastreImageModal = ({
  textToTrigger,
  initialData,
  saveImageId,
  disabled,
}: CadastreImageModalProps) => {
  const [cadastreImageModalIsOpen, setCadastreImageModalIsOpen] = useQueryState(
    "cadastreImageModalIsOpen",
    parseAsBoolean.withDefault(false)
  );
  const postHomeImageMutation = usePostHomeImage();

  const formCadastreImage = useForm<CadastreImageDTO>({
    resolver: zodResolver(cadastreImageSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      visibleInHome: false,
      ...(initialData && {
        artist: initialData.artist,
        screenwriter: initialData.screenwriter || "",
        colorist: initialData.colorist || "",
        horizontalPage: initialData.horizontalPage,
      }),
    },
  });

  useEffect(() => {
    if (initialData) {
      formCadastreImage.reset({
        ...formCadastreImage.getValues(),
        artist: initialData.artist ?? "",
        screenwriter: initialData.screenwriter ?? "",
        colorist: initialData.colorist ?? "",
        horizontalPage: initialData.horizontalPage ?? false,
      });
    }
  }, [initialData, formCadastreImage]);

  async function onSubmit(data: CadastreImageDTO) {
    const newImage = await postHomeImageMutation.mutateAsync(data, {
      onSuccess: () => toast.success("Imagem cadastrada com sucesso"),
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao cadastrar imagem"
        ),
    });
    setCadastreImageModalIsOpen(false);
    if (saveImageId) {
      saveImageId(newImage.id);
    }
  }

  const valueImageUrl = formCadastreImage.watch("imageUrl");

  return (
    <>
      <Dialog
        open={cadastreImageModalIsOpen}
        onOpenChange={(value) => {
          setCadastreImageModalIsOpen(value);
          formCadastreImage.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="w-full"
            onClick={() => {
              setCadastreImageModalIsOpen(true);
            }}
            disabled={disabled}
          >
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
                    src={matchUrlDrive(valueImageUrl)}
                    alt="Imagem que será salva"
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
                      <FormLabel>Url da Imagem</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira a url" {...field} />
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
                disabled={postHomeImageMutation.isPending}
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
