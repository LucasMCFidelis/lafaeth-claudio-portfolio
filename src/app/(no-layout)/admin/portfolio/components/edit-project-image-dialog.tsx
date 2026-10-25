"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import {
  projectImageUrlSchema,
  updateProjectImageSchema,
} from "@/app/data/schemas/update-project-image-schema";
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
import { useUpdateProjectImage } from "@/hooks/mutations/use-update-project-image";

import { ImageUploadInput } from "../../components/image-upload-input";

interface EditProjectImageDialogProps {
  image: ProjectImageAdminDTO;
}

const EditProjectImageDialog = ({ image }: EditProjectImageDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateProjectImageMutation = useUpdateProjectImage();
  const [isUploading, setIsUploading] = useState(false);

  const formSchema = z.object({
    id: updateProjectImageSchema.shape.id,
    title: updateProjectImageSchema.shape.title,
    imageUrl: z.string().transform((value, ctx) => {
      if (value === image.imageUrl) return value;
      const result = projectImageUrlSchema.safeParse(value);
      if (result.success) return result.data;
      ctx.addIssue({
        code: "custom",
        message: result.error.issues[0]?.message ?? "Link inválido",
      });
      return z.NEVER;
    }),
    originalUrl: z.string().nullish(),
  });
  type FormInput = z.input<typeof formSchema>;
  type FormOutput = z.infer<typeof formSchema>;

  const defaultValues: FormInput = {
    id: image.id,
    title: image.title,
    imageUrl: image.imageUrl,
    originalUrl: image.originalUrl,
  };

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const imageUrl = useWatch({ control: form.control, name: "imageUrl" });

  function onSubmit(data: FormOutput) {
    const imageChanged = data.imageUrl !== image.imageUrl;
    updateProjectImageMutation.mutate(
      {
        id: data.id,
        title: data.title,
        // The original is sent only together with the image it belongs to.
        ...(imageChanged && {
          imageUrl: data.imageUrl,
          originalUrl: data.originalUrl,
        }),
      },
      {
        onSuccess: () => {
          toast.success("Imagem atualizada");
          setOpen(false);
        },
        onError: (error) =>
          toast.error(
            error instanceof Error ? error.message : "Erro ao atualizar imagem"
          ),
      }
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) form.reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="flex-1">
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar imagem</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-video rounded-lg bg-accent">
              {imageUrl && (
                <Image
                  src={imageUrl}
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
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <ImageUploadInput
                      value={field.value}
                      onChange={({ imageUrl, originalUrl }) => {
                        field.onChange(imageUrl);
                        form.setValue("originalUrl", originalUrl);
                      }}
                      folder="projects"
                      onUploadingChange={setIsUploading}
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={updateProjectImageMutation.isPending || isUploading}
            >
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectImageDialog;
