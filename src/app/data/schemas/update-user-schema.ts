import z from "zod";

export const updateUserSchema = z.object({
  name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
  email: z.email("E-mail inválido!"),
  image: z
    .string()
    .refine(
      (val) =>
        val.includes("https://drive.google.com/") &&
        z.url().safeParse(val).success,
      {
        message: "Url da imagem deve ser uma URL válida do drive",
      }
    ),
  description: z.string(),
  birthDate: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "Data de nascimento não pode estar no futuro",
  }),
});
