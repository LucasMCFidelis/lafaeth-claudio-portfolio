import z from "zod";

export const cadastreColorSchema = z.object({
  imageId: z.uuid("Selecione uma imagem valida"),
  productionYear: z
    .number("Ano de publicação inválido")
    .min(1900, "Ano de publicação deve ser maior que 1900"),
  observations: z.string().optional(),
  visibleInColorization: z.boolean().catch(false),
});

export type CadastreColorDTO = z.infer<typeof cadastreColorSchema>;
