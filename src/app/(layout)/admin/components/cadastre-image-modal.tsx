"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

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
import { matchUrlDrive } from "@/helpers/match-url-drive";
import { usePostHomeImage } from "@/hooks/mutations/use-post-home-image";

const CadastreImageModal = () => {
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
    },
  });

  async function onSubmit(data: CadastreImageDTO) {
    await postHomeImageMutation.mutateAsync(data);
    setCadastreImageModalIsOpen(false);
  }

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
          >
            Adicionar imagem
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de imagem</DialogTitle>
            <DialogDescription>
              Preencha os todos os campos abaixo, você pode definir a ordem da
              imagem na galeria
            </DialogDescription>
          </DialogHeader>
          <Form {...formCadastreImage}>
            <form
              onSubmit={formCadastreImage.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira a descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    {field.value && (
                      <ContainerImageHome imageId="" disableLink={true} className="size-32 sm:size-48 mx-auto">
                        <ImageHome
                          src={matchUrlDrive(field.value)}
                          alt="Imagem que será salva"
                        />
                      </ContainerImageHome>
                    )}
                    <FormLabel>Url da Imagem</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira a url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCadastreImage.control}
                name="visibleInHome"
                render={({ field }) => (
                  <FormItem className="flex">
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
              <Button
                type="submit"
                className="w-full"
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
