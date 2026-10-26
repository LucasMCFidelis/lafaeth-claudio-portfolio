import z from "zod";

import { cadastreImageSchema } from "./cadastre-image-schema";

export const projectImageUrlSchema = cadastreImageSchema.shape.imageUrl;

export const updateProjectImageSchema = z.object({
  id: z.uuid("id invalido"),
  title: z.string().trim().min(1, "Título é obrigatório"),
  imageUrl: projectImageUrlSchema.optional(),
  // Only used together with imageUrl; null means the new image has no original.
  originalUrl: cadastreImageSchema.shape.originalUrl,
});

export type UpdateProjectImageInput = z.input<typeof updateProjectImageSchema>;
export type UpdateProjectImageDTO = z.infer<typeof updateProjectImageSchema>;
