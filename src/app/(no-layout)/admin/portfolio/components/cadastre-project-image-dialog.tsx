"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  CadastreProjectImageDTO,
  CadastreProjectImageInput,
  cadastreProjectImageSchema,
} from "@/app/data/schemas/cadastre-project-image-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { usePostProjectImage } from "@/hooks/mutations/use-post-project-image";

interface CadastreProjectImageDialogProps {
  projectId: string;
}

const CadastreProjectImageDialog = ({
  projectId,
}: CadastreProjectImageDialogProps) => {
  const [open, setOpen] = useState(false);
  const postProjectImageMutation = usePostProjectImage();

  const defaultValues: CadastreProjectImageInput = {
    projectId,
    title: "",
    imageUrl: "",
  };

  const form = useForm<
    CadastreProjectImageInput,
    unknown,
    CadastreProjectImageDTO
  >({
    resolver: zodResolver(cadastreProjectImageSchema),
    defaultValues,
  });

  const imageUrl = useWatch({ control: form.control, name: "imageUrl" });
  const preview =
    cadastreProjectImageSchema.shape.imageUrl.safeParse(imageUrl);

  function onSubmit(data: CadastreProjectImageDTO) {
    postProjectImageMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Imagem adicionada ao projeto");
        form.reset(defaultValues);
        setOpen(false);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao adicionar imagem"
        ),
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) form.reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <ImagePlus />
          Adicionar imagem
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova imagem do projeto</DialogTitle>
          <DialogDescription>
            A imagem entra no fim da lista. A primeira imagem visível é a capa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-video rounded-lg bg-accent">
              {preview.success && (
                <Image
                  src={preview.data}
                  alt="Prévia da imagem"
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-contain rounded-lg"
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link da imagem no Drive</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://drive.google.com/file/d/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Cartaz vertical" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={postProjectImageMutation.isPending}>
              Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CadastreProjectImageDialog;
