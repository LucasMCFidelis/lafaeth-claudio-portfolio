import z from "zod";

import { matchUrlDrive } from "@/helpers/match-url-drive";

export const cadastreImageSchema = z.object({
  title: z
    .string({ message: "Título inválido." })
    .trim()
    .min(1, "Título é obrigatório."),
  description: z
    .string({ message: "Descrição inválida." })
    .trim()
    .min(1, "Descrição é obrigatória."),
  imageUrl: z
    .string()
    .max(255, "URL muito longa")
    .refine(
      (val) =>
        val.includes("https://drive.google.com/") &&
        z.url().safeParse(val).success,
      {
        message: "Url da imagem deve ser uma URL válida do drive",
      }
    )
    .transform((val) => {
      return matchUrlDrive(val);
    }),
  visibleInHome: z.boolean().catch(false),
  artist: z
    .string({ message: "Artista inválido" })
    .min(1, "Artista é obrigatório"),
  screenwriter: z.string({ message: "Roteirista inválido" }).optional(),
  colorist: z.string({ message: "Colorista inválido" }).optional(),
  horizontalPage: z.boolean().catch(false),
});

export type CadastreImageDTO = z.infer<typeof cadastreImageSchema>;
