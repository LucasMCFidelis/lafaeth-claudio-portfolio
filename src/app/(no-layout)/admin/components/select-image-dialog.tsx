"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllImages } from "@/hooks/queries/use-all-images";
import { cn } from "@/lib/utils";

interface SelectImageDialogProps {
  trigger?: React.ReactNode;
  onSelect: (image: ImageDTO) => void;
}

export function SelectImageDialog({
  trigger,
  onSelect,
}: SelectImageDialogProps) {
  const { data: images } = useAllImages();
  const [open, setOpen] = useState(false);

  const handleSelect = (image: ImageDTO) => {
    onSelect(image);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Selecione uma imagem</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Selecione uma imagem</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
            {images?.map((image) => (
              <button
                key={image.id}
                onClick={() => handleSelect(image)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border hover:ring-2 hover:ring-primary"
                )}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
