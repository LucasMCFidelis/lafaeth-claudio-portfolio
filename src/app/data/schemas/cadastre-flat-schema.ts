import z from "zod";

export const cadastreFlatSchema = z.object({
  title: z
    .string({ message: "Título inválido." })
    .trim()
    .min(1, "Título é obrigatório."),
  description: z
    .string({ message: "Descrição inválida." })
    .trim()
    .min(1, "Descrição é obrigatória."),
  frontImageId: z.uuid(),
  backImageId: z.uuid(),
  visibleInFlat: z.boolean().catch(false),
});

export type CadastreFlatDTO = z.infer<typeof cadastreFlatSchema>;
