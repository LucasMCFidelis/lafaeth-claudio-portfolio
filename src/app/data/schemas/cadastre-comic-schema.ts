import z from "zod";

export const cadastreComicSchema = z.object({
  imageId: z.uuid("Selecione uma imagem valida"),
  productionYear: z
    .number("Ano de publicação inválido")
    .min(1900, "Ano de publicação deve ser maior que 1900"),
  productionSizePages: z
    .number("Número de páginas inválido")
    .min(1, "Número de páginas é obrigatório"),
  visibleInComics: z.boolean().catch(false),
});

export type CadastreComicDTO = z.infer<typeof cadastreComicSchema>;
