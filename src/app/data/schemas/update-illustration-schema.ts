import z from "zod";

import { cadastreIllustrationSchema } from "./cadastre-illustration-schema";

export const updateIllustrationSchema = z.object({
  id: z.uuid("id invalido"),
  ...cadastreIllustrationSchema.shape,
});

export type UpdateIllustrationDTO = z.infer<typeof updateIllustrationSchema>;
