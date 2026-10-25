"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import {
  createImageUploadUrl,
  ImageUploadTarget,
} from "@/actions/create-image-upload-url";
import {
  ImageFolder,
  imageUploadMessages,
  isAcceptedImageType,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/helpers/image-upload";

export const getUploadImageMutationKey = () => ["upload-image"] as const;

const putFile = (
  { uploadUrl, headers }: ImageUploadTarget,
  file: File,
  onProgress: (percent: number) => void
) =>
  new Promise<void>((resolve, reject) => {
    // XHR instead of fetch: fetch does not report upload progress.
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    Object.entries(headers).forEach(([name, value]) =>
      xhr.setRequestHeader(name, value)
    );
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error("Não foi possível enviar a imagem."));
    xhr.onerror = () =>
      reject(new Error("Falha ao enviar a imagem. Verifique sua conexão."));
    xhr.send(file);
  });

/**
 * Uploads an image straight to R2 and returns its public URL. Nothing is
 * saved in the database (and no query changes) until the form is submitted.
 */
export const useUploadImage = (folder: ImageFolder) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationKey: getUploadImageMutationKey(),
    mutationFn: async (file: File) => {
      if (!isAcceptedImageType(file.type)) {
        throw new Error(imageUploadMessages.invalidType);
      }
      if (file.size === 0) throw new Error(imageUploadMessages.empty);
      if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
        throw new Error(imageUploadMessages.tooLarge);
      }

      setProgress(0);

      let target: ImageUploadTarget;
      try {
        target = await createImageUploadUrl({
          contentType: file.type,
          size: file.size,
          folder,
        });
      } catch {
        // Server Action messages are hidden in production.
        throw new Error("Não foi possível preparar o envio. Tente de novo.");
      }

      await putFile(target, file, setProgress);
      return target.publicUrl;
    },
  });

  return { ...mutation, progress };
};
