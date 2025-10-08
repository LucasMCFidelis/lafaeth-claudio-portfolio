"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  CadastreFlatDTO,
  cadastreFlatSchema,
} from "@/app/data/schemas/cadastre-flat-schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useImage } from "@/hooks/queries/use-image";

import CadastreImageModal from "../../components/cadastre-image-modal";
import { SelectImageDialog } from "../../components/select-image-dialog";

interface CadastreFlatFormProps {
  imagesToSelect?: Array<ImageDTO>;
}

const CadastreFlatForm = ({ imagesToSelect }: CadastreFlatFormProps) => {
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
      <Form {...formCadastreFlat}>
        <form
          onSubmit={formCadastreFlat.handleSubmit(onSubmit)}
          className="w-full grid gap-4 md:grid-cols-2 mt-12"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={formCadastreFlat.control}
              name="frontImageId"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Imagem da Line</FormLabel>
                  {frontImage ? (
                    <div className="flex-1 relative mb-2">
                      <Image
                        src={frontImage.imageUrl}
                        alt="Selected image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full grid gap-4">
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
                          formCadastreFlat.setValue("frontImageId", imageId);
                        }}
                      />
                      <SelectImageDialog
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          setCadastreFlatStates({ frontImageId: image.id });
                          formCadastreFlat.setValue("frontImageId", image.id);
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
                <FormItem className="flex flex-col">
                  <FormLabel>Imagem do Flat</FormLabel>
                  {backImage ? (
                    <div className="flex-1 relative mb-2">
                      <Image
                        src={backImage.imageUrl}
                        alt="Selected image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full grid gap-4">
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
                        imagesToSelect={imagesToSelect}
                        onSelect={(image) => {
                          setCadastreFlatStates({ backImageId: image.id });
                          formCadastreFlat.setValue("backImageId", image.id);
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
          <Button type="submit" className="w-full col-span-full">
            Cadastrar Flat
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CadastreFlatForm;
