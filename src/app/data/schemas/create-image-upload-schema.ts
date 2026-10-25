import z from "zod";

import {
  ACCEPTED_IMAGE_TYPE_LIST,
  IMAGE_FOLDERS,
  imageUploadMessages,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/helpers/image-upload";

export const createImageUploadSchema = z.object({
  contentType: z.enum(ACCEPTED_IMAGE_TYPE_LIST, imageUploadMessages.invalidType),
  size: z
    .int("Tamanho inválido.")
    .positive(imageUploadMessages.empty)
    .max(MAX_IMAGE_UPLOAD_BYTES, imageUploadMessages.tooLarge),
  folder: z.enum(IMAGE_FOLDERS, "Pasta inválida."),
});

export type CreateImageUploadInput = z.input<typeof createImageUploadSchema>;
