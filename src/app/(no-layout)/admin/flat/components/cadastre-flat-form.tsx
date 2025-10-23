"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { FlatImageField } from "./flat-image-field";

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

  const { data: frontImage, refetch: refetchFront } = useImage(
    formCadastreFlat.watch("frontImageId")
  );
  const { data: backImage, refetch: refetchBack } = useImage(
    formCadastreFlat.watch("backImageId")
  );

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
                <FlatImageField
                  label="Imagem da Line"
                  image={frontImage}
                  relatedImage={backImage}
                  onSelectImage={(id) => {
                    formCadastreFlat.setValue("frontImageId", id);
                    refetchFront();
                  }}
                  imagesToSelect={imagesToSelect}
                />
              )}
            />
            <FormField
              control={formCadastreFlat.control}
              name="backImageId"
              render={() => (
                <FlatImageField
                  label="Imagem do Flat"
                  image={backImage}
                  relatedImage={frontImage}
                  onSelectImage={(id) => {
                    formCadastreFlat.setValue("backImageId", id);
                    refetchBack();
                  }}
                  imagesToSelect={imagesToSelect}
                />
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
