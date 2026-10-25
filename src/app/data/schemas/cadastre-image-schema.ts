import z from "zod";

import { imageUrlSchema } from "./image-url-schema";

export const cadastreImageSchema = z.object({
  title: z
    .string({ message: "Título inválido." })
    .trim()
    .min(1, "Título é obrigatório."),
  description: z
    .string({ message: "Descrição inválida." })
    .trim()
    .min(1, "Descrição é obrigatória."),
  imageUrl: imageUrlSchema,
  // Original file for download; null/undefined when imageUrl is the original.
  originalUrl: imageUrlSchema.nullish(),
  visibleInHome: z.boolean().catch(false),
  artist: z
    .string({ message: "Artista inválido" })
    .min(1, "Artista é obrigatório"),
  screenwriter: z.string({ message: "Roteirista inválido" }).optional(),
  colorist: z.string({ message: "Colorista inválido" }).optional(),
  horizontalPage: z.boolean().catch(false),
});

export type CadastreImageDTO = z.infer<typeof cadastreImageSchema>;
