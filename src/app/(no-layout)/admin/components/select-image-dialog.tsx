"use client";

import { useState } from "react";

import { ImageDTO } from "@/app/data/image/image-dto";
import AllImageList from "@/components/common/all-image-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SelectImageDialogProps {
  trigger?: React.ReactNode;
  onSelect: (image: ImageDTO) => void;
  imagesToSelect?: Array<ImageDTO>;
}

export function SelectImageDialog({
  trigger,
  onSelect,
  imagesToSelect
}: SelectImageDialogProps) {
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
          <AllImageList actionOnClick={handleSelect} initialData={imagesToSelect}/>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
