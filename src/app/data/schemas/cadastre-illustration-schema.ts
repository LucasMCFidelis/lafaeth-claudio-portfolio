import z from "zod";

export const cadastreIllustrationSchema = z.object({
  imageId: z.uuid("Selecione uma imagem valida"),
  description: z.string().optional(),
  // Optional link to where the illustration was published.
  redirectUrl: z.union([z.url("Link inválido"), z.literal("")]).optional(),
  horizontalIllustration: z.boolean().catch(false),
  visibleInIllustrations: z.boolean().catch(false),
});

export type CadastreIllustrationDTO = z.infer<typeof cadastreIllustrationSchema>;
