"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
import { usePostFlat } from "@/hooks/mutations/use-post-flat";
import { useImage } from "@/hooks/queries/use-image";

import CadastreImageModal from "../../components/cadastre-image-modal";
import { SelectImageDialog } from "../../components/select-image-dialog";

interface CadastreFlatFormProps {
  imagesToSelect?: Array<ImageDTO>;
}

const CadastreFlatForm = ({ imagesToSelect }: CadastreFlatFormProps) => {
  const postFlatMutation = usePostFlat();
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

  const { data: frontImage } = useImage(formCadastreFlat.watch("frontImageId"));
  const { data: backImage } = useImage(formCadastreFlat.watch("backImageId"));

  function onSubmit(data: CadastreFlatDTO) {
    postFlatMutation.mutate(data, {
      onSuccess: () => {
        formCadastreFlat.reset();
      },
    });
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
                <FormItem className="flex flex-col h-72">
                  <FormLabel>Imagem da Line</FormLabel>
                  <div className="flex-1 relative mb-2 bg-accent rounded-lg">
                    {frontImage && (
                      <Image
                        src={frontImage.imageUrl}
                        alt="Selected image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
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
                      saveImageId={(imageId) => {
                        formCadastreFlat.setValue("frontImageId", imageId);
                      }}
                      textToTrigger={
                        frontImage ? "Cadastrar outra imagem" : undefined
                      }
                    />
                    <SelectImageDialog
                      imagesToSelect={imagesToSelect}
                      onSelect={(image) => {
                        formCadastreFlat.setValue("frontImageId", image.id);
                      }}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formCadastreFlat.control}
              name="backImageId"
              render={() => (
                <FormItem className="flex flex-col h-72">
                  <FormLabel>Imagem do Flat</FormLabel>
                  <div className="flex-1 relative mb-2 bg-accent rounded-lg">
                    {backImage && (
                      <Image
                        src={backImage.imageUrl}
                        alt="Selected image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>

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
                      saveImageId={(imageId) => {
                        formCadastreFlat.setValue("backImageId", imageId);
                      }}
                      textToTrigger={
                        frontImage ? "Cadastrar outra imagem" : undefined
                      }
                    />
                    <SelectImageDialog
                      imagesToSelect={imagesToSelect}
                      onSelect={(image) => {
                        formCadastreFlat.setValue("backImageId", image.id);
                      }}
                    />
                  </div>

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
            disabled={postFlatMutation.isPending}
          >
            Cadastrar Flat
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CadastreFlatForm;
