"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import {
  UpdateProjectImageDTO,
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

interface EditProjectImageDialogProps {
  image: ProjectImageAdminDTO;
}

const EditProjectImageDialog = ({ image }: EditProjectImageDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateProjectImageMutation = useUpdateProjectImage();

  const defaultValues: UpdateProjectImageDTO = {
    id: image.id,
    title: image.title,
  };

  const form = useForm<UpdateProjectImageDTO>({
    resolver: zodResolver(updateProjectImageSchema),
    defaultValues,
  });

  function onSubmit(data: UpdateProjectImageDTO) {
    updateProjectImageMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Título atualizado");
        setOpen(false);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao atualizar imagem"
        ),
    });
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
              disabled={updateProjectImageMutation.isPending}
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
