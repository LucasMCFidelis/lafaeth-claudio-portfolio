"use client";

import { LoaderCircle, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ACCEPTED_IMAGE_TYPE_LIST, ImageFolder } from "@/helpers/image-upload";
import {
  UploadedImage,
  useUploadImage,
} from "@/hooks/mutations/use-upload-image";
import { cn } from "@/lib/utils";

interface ImageUploadInputProps {
  /** URL already in the field; only changes the button text. */
  value?: string;
  /** Receives the URLs to save once the file is in R2. */
  onChange: (uploaded: UploadedImage) => void;
  folder: ImageFolder;
  /**
   * JPEG and PNG also get a lighter WebP version, shown on the site, while the
   * file sent stays as the original (default). False uploads the file as is.
   */
  withDisplayVersion?: boolean;
  disabled?: boolean;
  /** Lets the form disable its submit button while a file is uploading. */
  onUploadingChange?: (uploading: boolean) => void;
  className?: string;
  // Set by <FormControl>, forwarded to the button.
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

/**
 * Picks (or receives by drag and drop) an image file, uploads it to R2 and
 * puts the public URL in the form field. Use inside <FormControl>.
 */
export function ImageUploadInput({
  value,
  onChange,
  folder,
  withDisplayVersion,
  disabled,
  onUploadingChange,
  className,
  ...buttonProps
}: ImageUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const upload = useUploadImage(folder, { withDisplayVersion });
  const uploading = upload.isPending;
  const blocked = disabled || uploading;

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  const handleFile = (file?: File) => {
    if (!file || blocked) return;
    upload.mutate(file, {
      onSuccess: (uploaded) => onChange(uploaded),
      onError: (error) =>
        toast.error(error.message || "Erro ao enviar a imagem"),
    });
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        if (!blocked) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFile(event.dataTransfer.files[0]);
      }}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-dashed p-3 transition-colors",
        dragging && "border-primary bg-accent",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPE_LIST.join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        disabled={blocked}
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          // Allows picking the same file again.
          event.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        disabled={blocked}
        onClick={() => inputRef.current?.click()}
        {...buttonProps}
      >
        {uploading ? <LoaderCircle className="animate-spin" /> : <Upload />}
        {uploading
          ? `Enviando… ${upload.progress}%`
          : value
            ? "Trocar imagem"
            : "Enviar imagem"}
      </Button>
      {uploading && (
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-[width]"
            style={{ width: `${upload.progress}%` }}
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        JPG, PNG, WebP, AVIF ou GIF, até 100 MB. Também dá para soltar o arquivo
        aqui.
      </p>
    </div>
  );
}
