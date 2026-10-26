import z from "zod";

import {
  endAfterStart,
  endAfterStartError,
  projectFieldsSchema,
} from "./cadastre-project-schema";

export const updateProjectSchema = z
  .object({
    id: z.uuid("id invalido"),
    ...projectFieldsSchema.shape,
  })
  .refine(endAfterStart, endAfterStartError);

export type UpdateProjectInput = z.input<typeof updateProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
