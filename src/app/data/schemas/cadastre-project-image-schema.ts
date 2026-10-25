import z from "zod";

import { cadastreImageSchema } from "./cadastre-image-schema";

export const cadastreProjectImageSchema = z.object({
  projectId: z.uuid("id invalido"),
  title: z.string().trim().min(1, "Título é obrigatório"),
  imageUrl: cadastreImageSchema.shape.imageUrl,
  originalUrl: cadastreImageSchema.shape.originalUrl,
});

export type CadastreProjectImageInput = z.input<
  typeof cadastreProjectImageSchema
>;
export type CadastreProjectImageDTO = z.infer<
  typeof cadastreProjectImageSchema
>;
