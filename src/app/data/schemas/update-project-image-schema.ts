import z from "zod";

export const updateProjectImageSchema = z.object({
  id: z.uuid("id invalido"),
  title: z.string().trim().min(1, "Título é obrigatório"),
});

export type UpdateProjectImageDTO = z.infer<typeof updateProjectImageSchema>;
