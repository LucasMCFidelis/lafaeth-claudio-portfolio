"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";

import {
  CadastreFlatDTO,
  cadastreFlatSchema,
} from "@/app/data/schemas/cadastre-flat-schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useImage } from "@/hooks/queries/use-image";

import CadastreImageModal from "./cadastre-image-modal";
import { SelectImageDialog } from "./select-image-dialog";

const CadastreFlatModal = () => {
  const [cadastreFlatStates, setCadastreFlatStates] = useQueryStates({
    cadastreFlatModalIsOpen: parseAsBoolean.withDefault(false),
    frontImageId: parseAsString,
    backImageId: parseAsString,
  });
  const { data: frontImage } = useImage(cadastreFlatStates.frontImageId || "");
  const { data: backImage } = useImage(cadastreFlatStates.backImageId || "");

  const formCadastreFlat = useForm<CadastreFlatDTO>({
    resolver: zodResolver(cadastreFlatSchema),
    defaultValues: {
      title: "",
      description: "",
      frontImageId: "",
      backImageId: "",
      visibleInFlat: true,
    },
  });

  async function onSubmit(data: CadastreFlatDTO) {
    console.log(data);

    setCadastreFlatStates({ cadastreFlatModalIsOpen: false });
  }

  return (
    <>
      <Dialog
        open={cadastreFlatStates.cadastreFlatModalIsOpen}
        onOpenChange={(value) => {
          setCadastreFlatStates({
            cadastreFlatModalIsOpen: value,
            frontImageId: null,
            backImageId: null,
          });
          formCadastreFlat.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="absolute top-0 right-0 -translate-x-4 translate-y-4"
            onClick={() => {
              setCadastreFlatStates({ cadastreFlatModalIsOpen: true });
            }}
          >
            Adicionar Flat
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Cadastro de Flat</DialogTitle>
            <DialogDescription className="hidden md:block">
              Preencha os todos os campos abaixo, você pode definir a ordem dos
              flats na galeria
            </DialogDescription>
          </DialogHeader>
          <Form {...formCadastreFlat}>
            <form
              onSubmit={formCadastreFlat.handleSubmit(onSubmit)}
              className="w-full grid gap-4 md:grid-cols-2"
            >
              <div className="space-y-4">
                <FormField
                  control={formCadastreFlat.control}
                  name="frontImageId"
                  render={() => (
                    <FormItem>
                      <FormLabel>Imagem da Line</FormLabel>
                      {frontImage ? (
                        <div className="w-32 h-32 relative mb-2">
                          <Image
                            src={frontImage.imageUrl}
                            alt="Selected image"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full grid md:grid-cols-2 gap-4">
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
                              setCadastreFlatStates({ frontImageId: imageId });
                              formCadastreFlat.setValue(
                                "frontImageId",
                                imageId
                              );
                            }}
                          />
                          <SelectImageDialog
                            onSelect={(image) => {
                              setCadastreFlatStates({ frontImageId: image.id });
                              formCadastreFlat.setValue(
                                "frontImageId",
                                image.id
                              );
                            }}
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formCadastreFlat.control}
                  name="backImageId"
                  render={() => (
                    <FormItem>
                      <FormLabel>Imagem do Flat</FormLabel>
                      {backImage ? (
                        <div className="w-32 h-32 relative mb-2">
                          <Image
                            src={backImage.imageUrl}
                            alt="Selected image"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full grid md:grid-cols-2 gap-4">
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
                              setCadastreFlatStates({ backImageId: imageId });
                              formCadastreFlat.setValue("backImageId", imageId);
                            }}
                          />
                          <SelectImageDialog
                            onSelect={(image) => {
                              setCadastreFlatStates({ backImageId: image.id });
                              formCadastreFlat.setValue(
                                "backImageId",
                                image.id
                              );
                            }}
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={formCadastreFlat.control}
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
                  control={formCadastreFlat.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Insira a descrição"
                          className=" resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full col-span-full"
              >
                Cadastrar Flat
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CadastreFlatModal;
