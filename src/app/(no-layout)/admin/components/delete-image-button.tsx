"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ImageUsage } from "@/app/data/image/image-usage-dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteImage } from "@/hooks/mutations/use-delete-image";

const usageLabels: Record<keyof ImageUsage, [string, string]> = {
  colors: ["colorização", "colorizações"],
  comics: ["quadrinho", "quadrinhos"],
  flats: ["flat", "flats"],
  illustrations: ["ilustração", "ilustrações"],
  banner: ["banner da página inicial", "banner da página inicial"],
};

const describeUsage = (usage: ImageUsage) =>
  (Object.keys(usage) as Array<keyof ImageUsage>)
    .filter((key) => usage[key] > 0)
    .map((key) => {
      const [singular, plural] = usageLabels[key];
      return key === "banner"
        ? singular
        : `${usage[key]} ${usage[key] === 1 ? singular : plural}`;
    })
    .join(", ");

interface DeleteImageButtonProps {
  imageId: string;
  /** Called after the image is deleted (e.g. close the details modal). */
  onDeleted: () => void;
  disabled?: boolean;
}

/**
 * Deletes an image from the library. If it is in use, shows where and asks
 * for a second confirmation; those items stay without an image.
 */
const DeleteImageButton = ({
  imageId,
  onDeleted,
  disabled,
}: DeleteImageButtonProps) => {
  const deleteImageMutation = useDeleteImage();
  const [open, setOpen] = useState(false);
  const [usage, setUsage] = useState<ImageUsage | null>(null);

  const runDelete = (force: boolean) =>
    deleteImageMutation.mutate(
      { imageId, force },
      {
        onSuccess: (result) => {
          if (!result.deleted) {
            setUsage(result.usage);
            return;
          }
          toast.success("Imagem excluída");
          setOpen(false);
          onDeleted();
        },
        onError: (error) =>
          toast.error(
            error instanceof Error ? error.message : "Erro ao excluir imagem"
          ),
      }
    );

  const pending = deleteImageMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (pending) return;
        setOpen(value);
        if (!value) setUsage(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className="w-full text-destructive hover:text-destructive"
        >
          <Trash2 />
          Excluir imagem
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {usage ? "Esta imagem está em uso" : "Excluir esta imagem?"}
          </DialogTitle>
          <DialogDescription>
            {usage
              ? `Ela aparece em: ${describeUsage(usage)}. Se excluir, esses itens ficam sem imagem e deixam de aparecer no site até receberem outra.`
              : "Essa ação não pode ser desfeita."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={pending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={pending}
            onClick={() => runDelete(usage !== null)}
          >
            {pending
              ? "Excluindo..."
              : usage
                ? "Excluir mesmo assim"
                : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteImageButton;
