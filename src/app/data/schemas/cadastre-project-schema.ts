import z from "zod";

const monthSchema = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Informe mês e ano")
  .transform((value) => `${value.slice(0, 7)}-01`);

export const projectFieldsSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug é obrigatório")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use só letras minúsculas, números e hífens"
    ),
  projectType: z.string().trim().optional(),
  startDate: monthSchema,
  endDate: z.union([monthSchema, z.literal("")]).optional(),
  description: z.string().trim().min(1, "Descrição é obrigatória"),
  visibleInProjects: z.boolean().catch(false),
  imageColumns: z.union([z.literal(1), z.literal(2)]).catch(2),
});

export const endAfterStart = (data: {
  startDate: string;
  endDate?: string;
}) => !data.endDate || data.endDate >= data.startDate;

export const endAfterStartError = {
  message: "O fim não pode ser antes do início",
  path: ["endDate"],
};

export const cadastreProjectSchema = projectFieldsSchema.refine(
  endAfterStart,
  endAfterStartError
);

export type CadastreProjectInput = z.input<typeof cadastreProjectSchema>;
export type CadastreProjectDTO = z.infer<typeof cadastreProjectSchema>;
