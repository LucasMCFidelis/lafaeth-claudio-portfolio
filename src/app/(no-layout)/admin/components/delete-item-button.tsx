"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
import { cn } from "@/lib/utils";

interface DeleteItemButtonProps {
  /** How the item is called in the texts, e.g. "esta colorização". */
  itemName: string;
  onDelete: () => Promise<unknown>;
  /** Where to go after deleting (the list page). */
  redirectTo: string;
  disabled?: boolean;
  className?: string;
}

/** "Excluir" button that asks for confirmation before deleting. */
const DeleteItemButton = ({
  itemName,
  onDelete,
  redirectTo,
  disabled,
  className,
}: DeleteItemButtonProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const confirmDelete = async () => {
    setPending(true);
    try {
      await onDelete();
      toast.success("Excluído com sucesso");
      setOpen(false);
      router.push(redirectTo);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao excluir, tente novamente"
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !pending && setOpen(value)}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full text-destructive hover:text-destructive",
            className
          )}
        >
          <Trash2 />
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir {itemName}?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. A imagem usada continua na
            biblioteca de imagens.
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
            onClick={confirmDelete}
            disabled={pending}
          >
            {pending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemButton;
