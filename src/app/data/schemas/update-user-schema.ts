import z from "zod";

export const updateUserSchema = z.object({
  name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
  email: z.email("E-mail inválido!"),
  image: z
    .string()
    .refine(
      (val) =>
        val.includes("https://drive.google.com/") &&
        z.string().url().safeParse(val).success,
      {
        message: "Url da imagem deve ser uma URL válida do drive",
      }
    ),
  description: z.string().optional(),
  birthDate: z
    .union([z.string(), z.null()])
    .transform((val) => {
      if (!val || val === "") return null;
      return val;
    })
    .refine(
      (val) => {
        if (val === null) return true;
        return new Date(val) <= new Date();
      },
      { message: "Data de nascimento não pode estar no futuro" }
    ),
  instagram: z.string().optional(),
  behance: z.string().optional(),
  whatsappNumber: z.number().optional(),
  whatsappMessage: z.string().optional(),
  lattes: z.string().optional(),
});
