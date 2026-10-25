"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import {
  createImageUploadUrl,
  ImageUploadTarget,
} from "@/actions/create-image-upload-url";
import { createDisplayImage } from "@/helpers/create-display-image";
import {
  ImageFolder,
  imageUploadMessages,
  isAcceptedImageType,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/helpers/image-upload";

export const getUploadImageMutationKey = () => ["upload-image"] as const;

/** URLs to save in the database after an upload. */
export type UploadedImage = {
  /** Version shown on the site. */
  imageUrl: string;
  /** Original file for download; null when imageUrl is already the original. */
  originalUrl: string | null;
};

const putFile = (
  { uploadUrl, headers }: ImageUploadTarget,
  file: File,
  onProgress: (loadedBytes: number) => void
) =>
  new Promise<void>((resolve, reject) => {
    // XHR instead of fetch: fetch does not report upload progress.
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    Object.entries(headers).forEach(([name, value]) =>
      xhr.setRequestHeader(name, value)
    );
    xhr.upload.onprogress = (event) => onProgress(event.loaded);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error("Não foi possível enviar a imagem."));
    xhr.onerror = () =>
      reject(new Error("Falha ao enviar a imagem. Verifique sua conexão."));
    xhr.send(file);
  });

const prepareUpload = async (file: File, folder: ImageFolder) => {
  if (!isAcceptedImageType(file.type)) {
    throw new Error(imageUploadMessages.invalidType);
  }

  try {
    return await createImageUploadUrl({
      contentType: file.type,
      size: file.size,
      folder,
    });
  } catch {
    // Server Action messages are hidden in production.
    throw new Error("Não foi possível preparar o envio. Tente de novo.");
  }
};

/**
 * Uploads an image straight to R2 and returns the URLs to save. A JPEG or PNG
 * also gets a lighter WebP version (shown on the site) while the file sent by
 * the user stays as the original; pass `withDisplayVersion: false` to upload
 * the file as it is. Nothing is saved in the database (and no query changes)
 * until the form is submitted.
 */
export const useUploadImage = (
  folder: ImageFolder,
  { withDisplayVersion = true }: { withDisplayVersion?: boolean } = {}
) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationKey: getUploadImageMutationKey(),
    mutationFn: async (file: File): Promise<UploadedImage> => {
      if (!isAcceptedImageType(file.type)) {
        throw new Error(imageUploadMessages.invalidType);
      }
      if (file.size === 0) throw new Error(imageUploadMessages.empty);
      if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
        throw new Error(imageUploadMessages.tooLarge);
      }

      setProgress(0);

      const display = withDisplayVersion ? await createDisplayImage(file) : null;
      const files = display ? [display, file] : [file];
      const targets = await Promise.all(
        files.map((item) => prepareUpload(item, folder))
      );

      // Both files go up at the same time; the bar follows the total.
      const totalBytes = files.reduce((sum, item) => sum + item.size, 0);
      const loadedBytes = files.map(() => 0);
      await Promise.all(
        files.map((item, i) =>
          putFile(targets[i], item, (loaded) => {
            loadedBytes[i] = loaded;
            const sent = loadedBytes.reduce((sum, value) => sum + value, 0);
            setProgress(Math.round((sent / totalBytes) * 100));
          })
        )
      );

      return display
        ? { imageUrl: targets[0].publicUrl, originalUrl: targets[1].publicUrl }
        : { imageUrl: targets[0].publicUrl, originalUrl: null };
    },
  });

  return { ...mutation, progress };
};
