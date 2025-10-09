import z from "zod";

import { cadastreFlatSchema } from "./cadastre-flat-schema";

export const updateFlatSchema = z.object({
  id: z.uuid("id invalido"),
  ...cadastreFlatSchema.shape,
});

export type UpdateFlatDTO = z.infer<typeof updateFlatSchema>;
