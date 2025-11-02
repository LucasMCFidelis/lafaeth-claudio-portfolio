import z from "zod";

import { cadastreColorSchema } from "./cadastre-color-schema";

export const updateColorSchema = z.object({
  id: z.uuid("id invalido"),
  ...cadastreColorSchema.shape,
});

export type UpdateColorDTO = z.infer<typeof updateColorSchema>;
