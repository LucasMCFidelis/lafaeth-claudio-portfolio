"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { usePostComic } from "@/hooks/mutations/use-post-comic";
import { getComicsVisibleQueryKey } from "@/hooks/queries/use-comics-visible";
import { useImage } from "@/hooks/queries/use-image";

import { ImageFormField } from "../../components/image-form-field";

interface CadastreComicFormProps {
  imagesToSelect?: Array<ImageDTO>;
}

const CadastreComicForm = ({ imagesToSelect }: CadastreComicFormProps) => {
  const formCadastreComic = useForm<CadastreComicDTO>({
    resolver: zodResolver(cadastreComicSchema),
  });

  const queryClient = useQueryClient();
  const postComicMutation = usePostComic();
  const { data: image } = useImage(formCadastreComic.watch("imageId"));

  function onSubmit(data: CadastreComicDTO) {
    postComicMutation.mutate(data, {
      onSuccess: (newComic) => {
        formCadastreComic.reset();
        if (newComic.visibleInComics) {
          queryClient.invalidateQueries({
            queryKey: getComicsVisibleQueryKey(),
          });
        }
        toast.success("Quadrinho cadastrado com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao cadastrar quadrinho"
        ),
    });
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
              <ImageFormField
                label="Imagem do quadrinho"
                image={image}
                onSelectImage={(imageId) => {
                  formCadastreComic.setValue("imageId", imageId);
                }}
                imagesToSelect={imagesToSelect}
                className="flex-1 md:h-full"
              />
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
            <Button
              type="submit"
              className="w-full"
              disabled={postComicMutation.isPending}
            >
              Cadastrar Quadrinho
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CadastreComicForm;
