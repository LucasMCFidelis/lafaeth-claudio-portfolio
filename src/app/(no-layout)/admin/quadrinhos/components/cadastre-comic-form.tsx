"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { ImageDTO } from "@/app/data/image/image-dto";
import {
  CadastreComicDTO,
  cadastreComicSchema,
} from "@/app/data/schemas/cadastre-comic-schema";
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
import { useImage } from "@/hooks/queries/use-image";

import CadastreImageModal from "../../components/cadastre-image-modal";
import { SelectImageDialog } from "../../components/select-image-dialog";

interface CadastreComicFormProps {
  imagesToSelect?: Array<ImageDTO>;
}

const CadastreComicForm = ({ imagesToSelect }: CadastreComicFormProps) => {
  const formCadastreComic = useForm<CadastreComicDTO>({
    resolver: zodResolver(cadastreComicSchema),
  });

  const { data: image } = useImage(formCadastreComic.watch("imageId"));

  function onSubmit(data: CadastreComicDTO) {
    console.log(data);
  }

  return (
    <>
      <Form {...formCadastreComic}>
        <form
          onSubmit={formCadastreComic.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-wrap gap-4 mt-12"
        >
          <FormField
            control={formCadastreComic.control}
            name="imageId"
            render={() => (
              <FormItem className="flex flex-1 h-full flex-col">
                <FormLabel>Imagem da Line</FormLabel>
                <div className="relative h-full mb-2 bg-accent rounded-lg">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt="Selected image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="w-full grid gap-4">
                  <CadastreImageModal
                    saveImageId={(imageId) => {
                      formCadastreComic.setValue("imageId", imageId);
                    }}
                    textToTrigger={image ? "Cadastrar outra imagem" : undefined}
                  />
                  <SelectImageDialog
                    imagesToSelect={imagesToSelect}
                    onSelect={(image) => {
                      formCadastreComic.setValue("imageId", image.id);
                    }}
                  />
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 w-full md:w-1/2 md:max-w-sm">
            <FormField
              control={formCadastreComic.control}
              name="productionSizePages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de páginas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o número de páginas"
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formCadastreComic.control}
              name="productionYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano de publicação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o ano de publicação"
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formCadastreComic.control}
              name="visibleInComics"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Exibir na página de quadrinhos</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Cadastrar Quadrinho
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CadastreComicForm;
