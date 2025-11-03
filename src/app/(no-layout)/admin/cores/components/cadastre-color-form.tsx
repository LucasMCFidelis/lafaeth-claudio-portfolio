"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  CadastreColorDTO,
  cadastreColorSchema,
} from "@/app/data/schemas/cadastre-color-schema";
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
import { usePostColor } from "@/hooks/mutations/use-post-color";
import { getColorsVisibleQueryKey } from "@/hooks/queries/use-colors-visible";
import { useImage } from "@/hooks/queries/use-image";

import { ImageFormField } from "../../components/image-form-field";

const CadastreColorForm = () => {
  const formCadastreColor = useForm<CadastreColorDTO>({
    resolver: zodResolver(cadastreColorSchema),
    defaultValues: {
      observations: "",
    },
  });

  const queryClient = useQueryClient();
  const postColorMutation = usePostColor();
  const { data: image } = useImage(formCadastreColor.watch("imageId"));

  function onSubmit(data: CadastreColorDTO) {
    postColorMutation.mutate(data, {
      onSuccess: (newColor) => {
        formCadastreColor.reset();
        if (newColor.visibleInColors) {
          queryClient.invalidateQueries({
            queryKey: getColorsVisibleQueryKey(),
          });
        }
        toast.success("Colorização cadastrada com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar colorização"
        ),
    });
  }

  return (
    <Form {...formCadastreColor}>
      <form
        onSubmit={formCadastreColor.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-wrap gap-4 mt-12"
      >
        <FormField
          control={formCadastreColor.control}
          name="imageId"
          render={() => (
            <ImageFormField
              label="Imagem da colorização"
              image={image}
              onSelectImage={(imageId) => {
                formCadastreColor.setValue("imageId", imageId);
              }}
              className="flex-1 md:h-full"
            />
          )}
        />
        <div className="space-y-4 w-full md:w-1/2 md:max-w-sm">
          <FormField
            control={formCadastreColor.control}
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
            control={formCadastreColor.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira alguma observação"
                    className="md:min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formCadastreColor.control}
            name="visibleInColorization"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Exibir na página de colorizações</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={postColorMutation.isPending}
          >
            Cadastrar Colorização
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CadastreColorForm;
